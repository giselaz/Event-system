const Event = require("../../model/event");

const createEvent = (event, userId, image, fakultetiId) => {
  if (event.Lloji_Eventit == "online") {
    event.Lloji_Eventit = Event.schema.path("Lloji_Eventit").enumValues[0];
  } else event.Lloji_Eventit = Event.schema.path("Lloji_Eventit").enumValues[1];

  const event1 = new Event({
    name: event.name,
    event_type: event.event_type,
    max_participants: event.max_participants,
    fee: event.fee,
    event_link: event.event_link,
    created_By: userId,
    image: image,
    faculty: fakultetiId
  });
  event1
    .save()
    .then(() => {
      console.log("Created Event");
    })
    .catch((err) => {
      console.log(err);
    });
  Event.find().populate('created_By')
};

const getEvent = async (userId) => {
  const event = await Event.findOne({
    created_By: userId,
  });
  return event;
};
const getEventOfFaculty = async(facultyId) => {
const events= await Event.find({
  faculty:facultyId
})
return events;
}
const getEventDetails = async (eventId) => {
  const event = Event.findById(eventId);
  return event;
};

const UpdateEvent = async (data, eventId) => {
  const event = await Event.findOneAndUpdate(
    { id: eventId },
    data,
    { new: true }
  );
  return event;

};



module.exports = { createEvent, getEvent, UpdateEvent, getEventDetails,getEventOfFaculty };
