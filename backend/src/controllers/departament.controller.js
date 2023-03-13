const DepartamentService = require("../services/admin/departament.service");

const postDepartament = async (req, res) => {
  const departament = await DepartamentService.createDepartament(req.body);
  res.send(departament);
};

const getAllDepartaments = async (req, res) => {
  const departaments = await DepartamentService.getAllDepartament();

  res.json(departaments);
};
module.exports = { postDepartament, getAllDepartaments };
