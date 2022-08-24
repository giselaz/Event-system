
const EventService = require('../services/admin/event.service')


exports.addEvent = async (req,res,next)=>{
console.log(req.body)
  const event = await EventService.createEvent(req.body,req.user.id,req.file.filename,req.params.fakultetId)
  res.send(event)
}

exports.getEvent=async (req,res)=>{
const event =await EventService.getEvent(req.user.id)
console.log(event)
res.send(event)

}