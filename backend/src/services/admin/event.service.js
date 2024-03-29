const Event = require("../../model/event");
const User = require("../../model/user");
const Participant = require("../../model/participant");
const { eventNames } = require("pdfkit");
const { resolve } = require("path");
const cron = require("node-cron");

const createEvent = async (event, userId, image) => {
  const userDb = await User.findOne({ _id: userId }).select("-password");
  console.log(event.start_date);
  const event1 = new Event({
    name: event.name,
    event_type: event.event_type,
    max_participants: event.max_participants,
    fee: event.fee,
    event_link: event.event_link,
    created_By: userId,
    created_By: userId,
    image: image,
    department: event.department,
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
const getEventOfFaculty = async (facultyId) => {
  const events = await Event.find({
    faculty: facultyId,
  });
  return events;
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
      .populate("created_By", "-password  -bookings")
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
  const events = await Event.find({
    start_date: {
      $gt: new Date(),
    },
  }).populate("created_By", "-password ");
  return events;
};

// const getParticipants = async (eventId) => {
//   const participants = await Event.findById(eventId)
//     .select("participants")
//     .populate("participants");

//   return participants;
// };

const getParticipants = async (eventId) => {
  try {
    const participants = await Participant.find({
      event: eventId,
    })
      .populate("event")
      .populate("user")
      .exec();
    return participants;
  } catch (err) {
    console.log(err);
  }
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
