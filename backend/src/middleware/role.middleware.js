async function checkAdmin(req, res, next) {
  if (req.user.role !== "admin")
    return res.status(403).json("User should have admin role");

  next();
}

async function checkPedagog(req, res, next) {
  if (req.user.role !== "admin" || req.user.role !== "pedagog")
    return res.status(403).json("User not authorized");

  next();
}
module.exports = { checkAdmin, checkPedagog };
