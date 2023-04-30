const express = require("express");
var route = express.Router();
const AuthController = require("../controllers/auth.contorller");
const AuthMiddleware = require("../middleware/auth.middleware");
const UserController = require("../controllers/user.controller");
const passport = require("./google.auth");

// route.get("/auth/failure", (req, res) => {
//   res.send("Something went wrong..");
// });

route.post("/login", AuthController.userLogin);
route.delete("/logout", AuthController.userLogOut);
route.post("/signup", UserController.addUser);
route.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

route.get(
  "/google/callback",
  passport.authenticate(
    "google",
    { session: false },
    {
      successRedirect: "http://localhost:3000/home",
    },
    {
      failureRedirect: "http://localhost:3000/login",
    }
  )
);
route.get("/getUser", AuthMiddleware.authenticated, (req, res) =>
  res.send(req.user)
);
module.exports = route;
