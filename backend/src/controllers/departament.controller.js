const DepartamentService = require("../services/admin/departament.service");
const path = require("path");
const postDepartament = async (req, res) => {
  const departament = await DepartamentService.createDepartament(
    req.file.filename,
    req.body
  );
  res.send(departament);
};

const getAllDepartaments = async (req, res) => {
  const departaments = await DepartamentService.getAllDepartament();

  res.json(departaments);
};
const getDepartamentImage = (req, res) => {
  DepartamentService.getDepartamentImage(req.params.departamentId).then(
    (image) => {
      const imagePath = path.resolve("src", "images", image);
      res.sendFile(imagePath);
    }
  );
};
module.exports = { postDepartament, getAllDepartaments, getDepartamentImage };
