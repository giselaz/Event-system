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
    res.json({ token });
  } else {
    try {
      await ValidateUser.validateLogin(req.body);
      const tokens = await AuthService.logIn(req.body);
      return res
        .header("Authorization", tokens.accessToken)
        .header("RefreshToken", tokens.refreshToken)
        .status(200)
        .json({
          user: tokens.user,
          access_token: tokens.accessToken,
        })
        .cookie("refreshToken", tokens.refreshToken, { httpOnly: true });
    } catch (err) {
      res.status(500).json({ message: "Internal Server error" });
    }
  }
};

// const userLogin = async (req, res, next) => {
//   passport.authenticate("login", async (err, user, info) => {
//     try {
//       if (err || !user) {
//         const error = new Error("An error occurred");
//         return next(error);
//       }
//       req.login(user, { session: false }, async (error) => {
//         if (error) return next(error);

//         const body = { _id: user._id, email: user.email, role: user.role };
//         const token = jwt.sign({ user: body }, process.env.SECRET_KEY, {
//           expiresIn: "3h",
//         });
//         return res.json({ token });
//       });
//     } catch (err) {}
//   });
// };
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
