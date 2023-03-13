const EventService = require("../services/admin/event.service");
const { validateCreatedEvent } = require("../validations/event.validations");
const moment = require("moment");
const path = require("path");

exports.addEvent = async (req, res) => {
  // const { error, value } = validateCreatedEvent(req.body);
  // if (error) {
  //   res.status(400).json({ error: error.details[0].message });
  // } else {
  console.log(req.file);
  await EventService.createEvent(
    req.body,
    req.user._id,
    req.file.filename
  ).then((event) => {
    res.send(event);
  });
  // }
};

exports.getEvent = async (req, res) => {
  const event = await EventService.getEvent(req.user.id);
  console.log(event);
  res.send(event);
};

exports.getEventDetails = (req, res) => {
  const event = EventService.getEventDetails(req.params.eventId).then((event) =>
    res.json(event)
  );
};

exports.getActiveEvents = async (req, res) => {
  const events = await EventService.activeEvents();
  res.status(200).send(events);
};
exports.getPastEvents = async (req, res) => {
  const events = await EventService.getPastEvents();
  res.send(events);
};

exports.getEventImage = (req, res) => {
  EventService.getEventImage(req.params.id).then((imagePath) =>
    res.sendFile(path.join("src", "images", imagePath))
  );
  // res.sendFile(EventService.getEventImage(req.params.id));
};

exports.getAllEvents = (req, res) => {
  const events = EventService.getAllEvents(req.params.departamentId).then(
    (events) => {
      res.json(events);
    }
  );
};
exports.getParticipants = async (req, res) => {
  const participants = await EventService.getParticipants(req.params.eventId);
  res.json(participants);
};
