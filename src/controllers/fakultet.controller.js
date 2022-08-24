const FakultetService = require('../services/admin/fakultet.service');
const postFakultet =async (req,res)=>{
const fakultet = await FakultetService.createFakultet(req.body);

res.send(fakultet);
}

module.exports={postFakultet}