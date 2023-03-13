const Role = require("../../model/role");

createRole = async (role) => {
  if (await Role.findOne({ name: role.name })) {
    throw new Error("Role already exists");
  } else {
    roleDb = new Role({
      name: role.name,
    });
    roleDb
      .save()
      .then(() => {
        console.log("role created");
      })
      .catch((err) => {
        console.log(err);
      });
    return roleDb;
  }
};

const getAllRoles = () => {
  return Role.find({});
};

const getRoleByName = (name) => {
  const roleDb = Role.findOne({ name: name });
  if (!roleDb) {
    throw new Error("Role with given name not found");
  }
  return roleDb;
};

module.exports = { createRole, getAllRoles, getRoleByName };
