const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    let token = req.headers.authorization?.split(" ");

    if (!token) {
      throw new Error("token not found");
    }
    const signature = process.env.SECRET_KEY;
    req.user = jwt.verify(token[1], signature);
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send("Invalid Token");
  }
};

module.exports = { verifyToken };
