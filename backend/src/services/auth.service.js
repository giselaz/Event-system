const bcrypt = require("bcrypt");
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const refreshTokenDb = require("../model/refresh");

const generateToken = async (payload) => {
  const secretKey = process.env.SECRET_KEY;
  const refreshToken = jwt.sign(payload, process.env.REFRESH_KEY);
  const accessToken = jwt.sign(payload, secretKey, { expiresIn: "3h" });
  const refreshDB = await refreshTokenDb.create({
    token: refreshToken,
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
  const tokens = await generateToken(payload);
  return tokens;
};

const validateUser = async (user) => {
  const dbUser = await User.findOne({ email: user.email });
  if (!dbUser) {
    throw new Error("User does not exist");
  } else if (dbUser && bcrypt.compareSync(user.password, dbUser.password)) {
    const userLog = {
      _id: dbUser._id,
      email: dbUser.email,
      vendor: dbUser.vendor,
      role: dbUser.userType,
    };
    return userLog;
  } else {
    throw new Error("User not authorized");
  }
};

const logOut = async (userId, refresh_token) => {
  const secretKey = process.env.REFRESH_KEY;
  const decodeToken = jwt.verify(refresh_token, secretKey);

  if (typeof decodeToken === "string")
    throw new Error("error decoding refresh token");
  if (userId !== decodeToken.id)
    throw new Error("Auth and refresh token are not of the same user.");

  await refreshTokenDb.deleteMany({
    user_id: userId,
    token: refresh_token,
  });
};

const generateAccess = async (refreshToken) =>{

  const secretKey = process.env.REFRESH_KEY;
  const decodeToken = jwt.verify(refreshToken,secretKey);
    if (typeof decodeToken === "string"){
    throw new Error("error decoding refresh token");
  }
  const accessToken = jwt.sign({id:decodeToken.id},process.env.SECRET_KEY,{expiresIn:'3h'});
  return accessToken;
}

module.exports = { logIn, logOut ,generateAccess};
