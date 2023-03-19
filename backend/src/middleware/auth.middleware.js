const jwt = require("jsonwebtoken");
const passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;
const UserModel = require("../model/user");

const verifyToken = async (req, res, next) => {
  try {
    let token = req.headers.authorization?.split(" ");
    console.log(token);
    const signature = process.env.SECRET_KEY;
    req.user = jwt.verify(token[1], signature);
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send("Invalid Token");
  }
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
module.exports = { verifyToken };
