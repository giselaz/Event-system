const EventService = require("../services/admin/event.service");
const {
  validateCreatedEvent,
  validateUpdatedEvent,
} = require("../validations/event.validations");
const path = require("path");

exports.addEvent = (req, res) => {
  const eventData = {
    ...req.body,
    created_By: req.user._id,
    image: req.file.filename,
    vendor: req.params.vendorId,
  };
  const { error, value } = validateCreatedEvent(eventData);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    EventService.createEvent(eventData).then((event) => {
      res.send(event);
    });
  } 
};

exports.getEvent = async (req, res) => {
  const event = await EventService.getEventsByUser(req.user.id);
  console.log(event);
  res.send(event);
};

exports.getAllEvents = async (req, res) => {
  const events = await EventService.getAllEvents();
  res.send(events);
};

exports.getEventDetails = (req, res) => {
  console.log("here");
  EventService.getEventDetails(req.params.eventId).then((event) =>
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

exports.updateEvent = async (req, res) => {
  const eventData = { ...req.body, logo: req.file.filename };
  const { error, value } = validateUpdatedEvent(eventData);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
  }
  const event = await eventService.updateevent(eventData);
  res.status(200).json({ message: "event successfully updated", event });
};
exports.deleteEvent = async (req, res) => {
  const deleted = await EventService.deleteEvent(req.params.eventId);
  res
    .status(deleted ? 200 : 400)
    .json(
      deleted
        ? "event successfully deleted"
        : `event with id ${req.params.eventId} could not be deleted`
    );
};

exports.getEventImage = async (req, res) => {
  await EventService.getEventImage(req.params.eventId).then((image) => {
    const imagePath = path.resolve("src", "images", image);
    res.sendFile(imagePath);
  });
};

exports.getVendorEvents = (req, res) => {
  EventService.getVendorEvents(req.params.vendorId).then((events) => {
    res.json(events);
  });
};

exports.getCategoryEvents = (req, res) => {
  EventService.getCategoryEvents(req.params.vendorId).then((events) => {
    res.json(events);
  });
};
exports.getParticipants = async (req, res) => {
  const participants = await EventService.getParticipants(req.params.eventId);
  res.json(participants);
};
