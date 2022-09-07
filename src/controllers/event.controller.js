const EventService = require('../services/admin/event.service')
const {validateCreatedEvent} = require('../validations/event.validations')

exports.addEvent = async (req,res,next)=>{
console.log(req.body.data_fillimit);
  await validateCreatedEvent(req.body)
  const event = await EventService.createEvent(req.body,req.user.id,req.file.path,req.params.fakultetId)
  res.send(event)
}

exports.getEvent=async (req,res)=>{
const event =await EventService.getEvent(req.user.id)
console.log(event)
res.send(event)

}

exports.getEventDetails = async (req,res)=>{
  const event =await EventService.getEventDetails(req.params.eventId)
  res.send(event);
}

exports.getEventByFacultyId = async (req,res)=>{
  try{
    const events = await EventService.getEventOfFaculty(req.params.facultyId)
return res.status(200).json({message:events})
  }catch(error){
    return res.status(400).json({message:error})
  }
}