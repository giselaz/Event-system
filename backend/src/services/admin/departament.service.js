const Departament = require("../../model/departamenti");

const createDepartament = async (image, departament) => {
  if (await Departament.findOne({ emri: departament.emri })) {
    throw new Error("Departamenti me te njejtin emer ekziston ");
  } else {
    const departamentDb = new Departament({
      emri: departament.emri,
      pershkrimi: departament.pershkrimi,
      image: image,
    });
    departamentDb
      .save()
      .then(() => {
        console.log("departament created");
      })
      .catch((err) => {
        console.log(err);
      });
    return departamentDb;
  }
};

const getDepartamentImage = (departamentId) => {
  return new Promise((resolve, reject) => {
    const ImagePath = Departament.findById(departamentId)
      .select("image")
      .then((departament) => resolve(departament.image))
      .catch((err) => reject(err));
  });
};
const getAllDepartament = () => {
  return Departament.find({});
};

module.exports = { createDepartament, getAllDepartament, getDepartamentImage };
