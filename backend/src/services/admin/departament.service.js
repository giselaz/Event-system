const Departament = require("../../model/departamenti");

const createDepartament = async (departament) => {
  if (await Departament.findOne({ emri: departament.emri })) {
    throw new Error("Departamenti me te njejtin emer ekziston ");
  } else {
    const departamentDb = new Departament({
      emri: departament.emri,
      pershkrimi: departament.pershkrimi,
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

const getAllDepartament = () => {
  return Departament.find({});
};

module.exports = { createDepartament, getAllDepartament };
