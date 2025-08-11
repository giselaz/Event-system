async function checkAdmin(req, res, next) {
  if (req.user.role !== "admin")
    return res.status(403).json("User should have admin role");

  next();
}
async function checkOrganizer(req, res, next) {
  if (req.user.role !== "admin" && req.user.role !== "organizer" && req.user.vendor !== req.params.vendorId)
    return res.status(403).json("User not authorized");
  next();
}
async function checkVendor(req, res, next) {
  if (req.user.role !== "admin" && req.user.role !== "vendor" && req.user.vendor !== req.params.vendorId)
    return res.status(403).json("User not authorized");
  next();
}
module.exports = { checkAdmin, checkOrganizer ,checkVendor};
