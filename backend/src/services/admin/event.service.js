const Event = require("../../model/event");
const User = require("../../model/user");
// const Participant = require("../../model/participant");
// const { eventNames } = require("pdfkit");
// const { resolve } = require("path");
// const cron = require("node-cron");

const createEvent = async (eventData) => {
  const event1 = new Event(
    eventData
    // start_date: moment(event.start_date).format("DD-MM-YYYY"),
    // end_date: moment(event.end_date).format("DD-MM-YYYY"),
  );
  event1
    .save()
    .then(() => {
      console.log("Created Event");
    })
    .catch((err) => {
      console.log(err);
    });

  return event1;
};

const getEventsByUser = async (userId) => {
  const event = await Event.find({
    created_By: userId,
  });
  return event;
};

const getEventDetails = async (eventId) => {
  const event = await Event.findById(eventId).populate("vendor");
  return event;
};

const getVendorEvents = async (vendorId) => {
  const events = await Event.find({ vendor: vendorId });
  return events;
};
const UpdateEvent = async (data, eventId) => {
  const event = await Event.findOneAndUpdate({ id: eventId }, data, {
    new: true,
  });
  return event;
};

const getCategoryEvents = async (categoryId) => {
  const events = await Event.find({ category: categoryId });

  return { events };
};
const deleteEvent = async (eventId) => {
  const deletedEvent = await vendor.deleteMany({ _id: eventId });
  return deletedEvent.deletedCount > 0;
};

const getAllEvents = async () => {
  const events = await Event.find()
    .populate("created_By", "-password -bookings")
    .populate("category", "name")
    .populate("vendor", "name");
  return events;
};

const getPastEvents = async () => {
  return new Promise((resolve, reject) => {
    Event.find({
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

const getParticipants = async (eventId) => {
  const event = await Event.findById(eventId);
  return event.participants;
};

const getEventImage = (eventId) => {
  return new Promise((resolve, reject) => {
    Event.findById(eventId)
      .select("image")
      .then((event) => resolve(event.image))
      .catch((err) => reject(err));
  });
};

module.exports = {
  createEvent,
  getEventsByUser,
  UpdateEvent,
  getEventDetails,
  activeEvents,
  getPastEvents,
  getParticipants,
  deleteEvent,
  getEventImage,
  getVendorEvents,
  getCategoryEvents,
  getAllEvents,
};
