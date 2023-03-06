const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const UserModel = require("./model/user");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async function (email, password, cb) {
      //this one is typically a DB call. Assume that the returned
      // user object is pre-formatted and ready for storing in JWT
      return UserModel.findOne({ email, password })
        .then((user) => {
          if (!user) {
            return cb(null, false, { message: "Incorrect email or password." });
          }
          return cb(null, user, { message: "Logged In Successfully" });
        })
        .catch((err) => cb(err));
    }
  )
);
