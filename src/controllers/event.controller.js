const EventService = require('../services/admin/event.service')
const {validateCreatedEvent} = require('../validations/event.validations')
const moment = require('moment')
exports.addEvent = async (req,res)=>{
  console.log(req.file.path)
  await validateCreatedEvent(req.body)
  const event = await EventService.createEvent(req.body,req.user._id,req.file.path,req.params.fakultetId)
  res.status(200).json({message:event})
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