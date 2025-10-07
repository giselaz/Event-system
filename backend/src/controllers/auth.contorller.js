const AuthService = require("../services/auth.service");
const ValidateUser = require("../validations/user.validation");
const passport = require("../middleware/passport.auth.middleware");
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");
const UserModel = require("../model/user");

const userLogin = async (req, res) => {
  if (req.body.googleAccessToken) {
    const decoded = await jwt_decode(req.body.googleAccessToken);
    const dBUser = await UserModel.findOne({ email: decoded.email });
    if (!dBUser) {
      res.status(400).json({ message: "User with this email doesnt exist" });
    }
    const user = {
      email: dBUser.email,
      id: dBUser._id,
      role: dBUser.role,
    };
    const token = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: "3h" });
    res.send(token);
  } else {
    try {
      ValidateUser.validateLogin(req.body);
      const tokens = await AuthService.logIn(req.body);

      res.cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,
        secure: true, // only send on HTTPS in prod
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // expires in 7 days
        path: "/",
      }); // available to all routes})
      res.status(200).json({
        access_token: tokens.accessToken,
      }); 
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server error" });
    }
  }
};

const generateAccess = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  try {
    const accessToken = await AuthService.generateAccess(refreshToken);
    if (!accessToken) {
      res.status(401).json({ message: "Refresh Token expired" });
    }
    return res.status(200).json({ access_token: accessToken });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const userLogOut = async (req, res) => {
  const refreshToken = req.header("refreshToken");
  if (refreshToken.startsWith("Bearer ")) {
    refreshToken.substring(7, refreshToken.length);
  }
  const userId = req.userId;
  await AuthService.logOut(userId, refreshToken);

  res.send({ message: "Refresh token deleted  successfully" });
};
module.exports = { userLogin, userLogOut, generateAccess };
