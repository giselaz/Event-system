const Event = require("../../model/event");
const User = require("../../model/user");
const moment = require("moment");
const { eventNames } = require("pdfkit");
const { resolve } = require("path");
const { readlink } = require("fs");

const createEvent = async (event, userId, image, departamentId) => {
  const userDb = await User.findOne({ _id: userId }).select("-password");
  console.log(event.start_date);
  const event1 = new Event({
    name: event.name,
    event_type: event.event_type,
    max_participants: event.max_participants,
    fee: event.fee,
    event_link: event.event_link,
    created_By: userId,
    image: image,
    department: departamentId,
    start_date: event.start_date,
    end_date: event.end_date,
    location: event.location,
    description: event.description,
    // start_date: moment(event.start_date).format("DD-MM-YYYY"),
    // end_date: moment(event.end_date).format("DD-MM-YYYY"),
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
  // userDb.event.push(event1);
  // userDb.save();
  return event1;
};

const getEvent = async (userId) => {
  const event = await Event.findOne({
    created_By: userId,
  });
  return event;
};
const getEventDetails = async (eventId) => {
  const event = await Event.findById(eventId).populate("department");
  return event;
};

const getAllEvents = async (departmentId) => {
  const events = await Event.find({ department: departmentId });
  return events;
};
const UpdateEvent = async (data, eventId) => {
  const event = await Event.findOneAndUpdate({ id: eventId }, data, {
    new: true,
  });
  return event;
};

const getPastEvents = async () => {
  return new Promise((resolve, reject) => {
    const events = Event.find({
      start_date: {
        $lte: new Date(),
      },
    })
      .populate("created_By", "-password -userType -bookings")
      .then((events) => {
        events.forEach((event) => {
          event.active = "false";
        });
        resolve(events);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const activeEvents = async () => {
  // return new Promise(resolve,reject)
  const events = Event.find({
    start_date: {
      $gt: new Date(),
    },
  });

  // for (let event of events) {
  //   console.log(event);
  // }
  // .populate("faculty")
  // .exec();
};
const getParticipants = async (eventId) => {
  const participants = await Event.findById(eventId)
    .select("participants")
    .populate("participants");

  return participants;
};

const getEventImage = (eventId) => {
  return new Promise((resolve, reject) => {
    const ImagePath = Event.findById(eventId)
      .select("image")
      .then((event) => resolve(event.image))
      .catch((err) => reject(err));
  });
};
module.exports = {
  createEvent,
  getEvent,
  UpdateEvent,
  getEventDetails,
  activeEvents,
  getPastEvents,
  getParticipants,
  getEventImage,
  getAllEvents,
};
