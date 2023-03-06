const jwt = require("jsonwebtoken");
const passport = require("passport");
const config = require("../passport");
const passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;
const UserModel = require("../model/user");

const verifyToken = async (req, res, next) => {
  try {
    let token = req.headers.authorization?.split(" ");
    if (!token) {
      return res.sendStatus(401);
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.sendStatus(401);
        jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET,
          (err, user) => {
            if (err) return res.sendStatus(403);

            const accessToken = generateAccessToken(user);
            const newRefreshToken = generateRefreshToken(user);

            res.json({
              accessToken: accessToken,
              refreshToken: newRefreshToken,
            });
          }
        );
      } else {
        req.user = user;
        next();
      }
    });
    const signature = process.env.SECRET_KEY;
    req.user = jwt.verify(token[1], signature);
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send("Invalid Token");
  }
};

const isLoggedIn = (req, res, next) => {
  req.user ? next() : res.sendStatus(401);
};

// const passportAuth = async () => {
//   var strategy = new Strategy(params, function (payload, done) {
//     var user = UserModel.findById(payload._id, function (err, user) {
//       if (err) {
//         return done(new Error("UserNotFound"), null);
//       } else if (payload.expire <= Date.now()) {
//         return done(new Error("TokenExpired"), null);
//       } else {
//         return done(null, user);
//       }
//     });
//   });
//   passport.use(strategy);
//   return {
//     initialize: function () {
//       return passport.initialize();
//     },
//     authenticate: function () {
//       return passport.authenticate("jwt", config.jwtSession);
//     },
//   };
// };
module.exports = { verifyToken, isLoggedIn };
