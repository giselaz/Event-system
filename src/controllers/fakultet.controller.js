const FakultetService = require('../services/admin/fakultet.service');



const postFakultet = async (req, res) => {
    const fakultet = await FakultetService.createFakultet(req.body);

    res.send(fakultet);
}

const getAllFaculties = async (req,res)=>{
    const faculties = await FakultetService.getAllFaculty();
    
    res.send(faculties);
}
module.exports = { postFakultet }