const FakultetService = require('../services/admin/fakultet.service');



const postFakultet = async (req, res) => {
    const fakultet = await FakultetService.createFakultet(req.body);

    res.send(fakultet);
}
const getAllFaculties = async (req, res) => {
    try {
        const faculties = await FakultetService.getAllFaculty();
        return res.json(faculties);
    } catch (error) {
        return res.send(400).json({ message: error })
    }


}

module.exports = { postFakultet, getAllFaculties, }