const RoleService = require("../services/admin/role.service");

const postRole = async (req, res) => {
  const role = await RoleService.createRole(req.body);

  res.send(role);
};

const getAllRoles = async (req, res) => {
  const roles = await RoleService.getAllFaculty();

  res.send(roles);
};

const getRoleByName = async (req, res) => {
  const role = await RoleService.getRoleByName(req.body);
  res.send(role);
};
module.exports = { postRole, getAllRoles, getRoleByName };
