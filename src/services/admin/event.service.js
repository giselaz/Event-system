const Event = require("../../model/event");
const User = require('../../model/user')
const moment= require('moment');
const createEvent = (event, userId,image,fakultetiId) => {
  const event1 = new Event({
    name: event.name,
    event_type: event.event_type,
    max_participants: event.max_participants,
    fee: event.fee,
    event_link: event.event_link,
    created_By:userId,
    image: image,
    faculty:fakultetiId,
    start_date:moment(event.start_date).format('DD-MM-YYYY')
  });
  event1
    .save()
    .then(() => {
      console.log("Created Event");

    })
    .catch((err) => {
      console.log(err);
    });
//if user admin push the created event to the events array
    // const userDb = User.findOne({_id:userId})
    // userDb.event.push(event1);
  return event1;
};

const getEvent = async (userId) => {
  const event = await Event.findOne({
    created_By: userId,
  });
  return event;
};
const getEventDetails = async (eventId) => {
  const event = Event.findById(eventId);
return event;
};

const UpdateEvent = async (data,eventId) => {
  const event = await Event.findOneAndUpdate(
    { id: eventId },
    data,
    { new: true }
  );
  return event;

};



module.exports = { createEvent, getEvent ,UpdateEvent,getEventDetails};
