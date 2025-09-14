const jwt = require("jsonwebtoken");
 

const verifyToken = async (req, res, next) => {
  try {
    let token = req.headers.authorization?.split(" ")[1];
    const isCostumAuth = token.length < 500;
    if (token && isCostumAuth) {
      const signature = process.env.SECRET_KEY;
      req.user = jwt.verify(token, signature);
    } else {
      const decodedData = jwt.decode(token);
      req.user = decodedData?.sub;
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(401).send("Invalid Token");
  }
};

const authenticated = async (req, res, next) => {
  const customError = new Error("you are not logged in");
  customError.statusCode = 401;
  !req.user ? next(customError) : next();
};

module.exports = { verifyToken, authenticated };
