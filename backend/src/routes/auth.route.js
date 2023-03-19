const express = require("express");
// const LocalStrategy = require("passport-local").Strategy;
var route = express.Router();
const AuthController = require("../controllers/auth.contorller");
const AuthMiddleware = require("../middleware/auth.middleware");
const UserController = require("../controllers/user.controller");

// route.get("/", (req, res) => {
//   res.send('<a href="auth/google">Authenticate with google</a>');
// });

// route.get(
//   "/google",
//   passport.authenticate("google", { scope: ["email", "profile"] })
// );

// route.get(
//   "/google/callback",
//   passport.authenticate("google", {
//     successRedirect: "/protected",
//     failureRedirect: "/auth/failure",
//   }),
//   AuthController.userLogin
// );

// route.get("/protected", AuthMiddleware.isLoggedIn, (req, res) => {
//   res.send("Hello");
// });

// route.get("/auth/failure", (req, res) => {
//   res.send("Something went wrong..");
// });

route.post("/login", AuthController.userLogin);
route.delete("/logout", AuthController.userLogOut);
route.post("/signup", UserController.addUser);

module.exports = route;
