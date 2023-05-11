const bcrypt = require("bcrypt");
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const passportJwt = require("passport-jwt");
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
const refreshToken = require("../model/refresh");
const { db } = require("../model/user");

const generateToken = async (payload) => {
  const secretKey = process.env.SECRET_KEY;
  const refreshToken = jwt.sign(payload, process.env.REFRESH_KEY);
  const accessToken = jwt.sign(payload, secretKey, { expiresIn: "3h" });
  const refreshDB = await refreshToken.create({
    token: refresh_Token,
    user_id: payload._id,
  });
  refreshDB
    .save()
    .then(() => {
      console.log("refresh Created");
    })
    .catch((err) => {
      console.log(err);
    });
  return { accessToken, refreshToken };
};
const logIn = async (user) => {
  const payload = await validateUser(user);
  const { accessToken, refreshToken } = generateToken(payload);
  return {
    accessToken,
    refreshToken,
  };
};

const validateUser = async (user) => {
  const dbUser = await User.findOne({ email: user.email });
  if (!dbUser) {
    throw new Error("User does not exist");
  } else if (dbUser && bcrypt.compareSync(user.password, dbUser.password)) {
    const userLog = {
      _id: dbUser._id,
      email: dbUser.email,
      name: dbUser.name,
      surname: dbUser.surname,
      role: dbUser.userType,
    };
    return userLog;
  } else {
    throw new Error("User not authorized");
  }
};
// const authUser = async (email, password, done) => {
//   const dbUser = await User.findOne({ email: email });
//   if (!dbUser) {
//     return done(null, false);
//   } else if (dbUser && !bcrypt.compareSync(password, dbUser.password)) {
//     return done(null, false);
//   }
//   return done(null, dbUser);
// };

const logOut = async (userId, refresh_Token) => {
  const secretKey = process.env.REFRESH_KEY;
  const decodeToken = jwt.verify(refresh_Token, secretKey);

  if (typeof decodeToken === "string")
    throw new Error("error decoding refresh token");
  if (userId !== decodeToken.id)
    throw new Error("Auth and refresh token are not of the same user.");

  await refreshToken.deleteMany({
    user_id: userId,
    token: refreshToken,
  });
};

module.exports = { logIn, logOut };
