const User = require("../model/user");

 async function checkAdmin(req, res, next) {
  const user = User.findById(req.user.id).select("userType");

  if (user.type !== "admin")
    return res.status(403).json("User should have admin role");

  next();
}

async function checkPedagog(req,res,next){
    const user = User.findById(req.user.id).select("userType");

    if (user.type !== "admin" || user.type !== "pedagog")
      return res.status(403).json("User not authorized");
  
    next();
}
module.exports={checkAdmin,checkPedagog}