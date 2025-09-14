const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const UserModel = require("../model/user");

passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const { name, surname } = req.body;
        const user = await UserModel.findOrCreate(
          { email },
          {
            name,
            surname,
            email,
            password,
          }
        );
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = UserModel.findOne({ email });
        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
          return done(null, false, { message: "Wrong password" });
        }
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);
module.exports = passport;
