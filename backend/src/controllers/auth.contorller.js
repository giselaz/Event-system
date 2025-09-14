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
      res
        .header("Authorization", tokens.accessToken)
        .cookie("refreshToken", tokens.refreshToken, { httpOnly: true })
        .cookie("accessToken", tokens.accessToken, { httpOnly: true });
      res.status(200).json({
        access_token: tokens.accessToken,
      });
    } catch (err) {
      res.status(500).json({ message: "Internal Server error" });
    }
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
module.exports = { userLogin, userLogOut };
