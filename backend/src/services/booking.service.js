const { ConnectionPoolClosedEvent } = require("mongodb");
const { v4: uuid } = require("uuid");
const Booking = require("../model/booking");
const Event = require("../model/event");
const User = require("../model/user");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const Paricipant = require("../model/participant");

const bookLiveEvent = async (user, eventId, quantity, token) => {
  const event = await Event.findById(eventId);
  console.log(event);
  const userDb = await User.findOne({ _id: user._id }).select(
    "-password -bookings"
  );
  if (!event.active) {
    throw new Error("event has ended");
  } else if (event.fee == 0) {
    const amount = 0;
    console.log(event);
    const booking = new Booking({
      event: event,
      user: userDb,
      total_amount: amount,
      quantity,
    });
    booking
      .save()
      .then(() => {
        console.log("Created Booking");
      })
      .catch((err) => {
        console.log(err);
      });
    return booking;
  } else {
    try {
      const customer = await stripe.customers.create({
        email: token.email,
        source: token.id,
      });

      const payment = await stripe.charges.create(
        {
          amount: quantity * event.fee * 100,
          customer: customer.id,
          currency: "ALL",
          receipt_email: token.email,
        },
        {
          idempotencyKey: uuid(),
        }
      );

      if (payment) {
        const booking = new Booking({
          event: event,
          user: user._id,
          total_amount: event.fee * quantity,
          quantity,
          transactionid: uuid(),
        });
        booking.save().then(() => console.log("Paid booking created"));
        const participant = new Paricipant({
          event: event,
          user: userDb,
        });
        participant.save().then(() => console.log("participant created"));
        return booking.populate("event");
      }
    } catch (error) {
      console.log(error);
    }
  }
};

const bookOnlineEvent = async (userId, eventId) => {
  const event = await Event.findById(eventId);
  const userDb = await User.findOne({ _id: userId }).select(
    "-password -bookings"
  );
  const bookingUser = await Paricipant.findOne({
    user: userId,
    event: eventId,
  });
  console.log(userDb);
  if (!event.active) {
    throw new Error("Eventi ka mbaruar");
  } else if (bookingUser) {
    throw new Error("Pjesemarrja juaj eshte konfirmuar tashme");
  } else {
    const booking = new Booking({
      event,
      user: userDb,
    });

    booking
      .save()
      .then(() => console.log("Online booking created"))
      .catch((err) => console.log(err));
    const participant = new Paricipant({
      event,
      user: userDb,
    });
    participant.save().then(() => console.log("participant created"));
    return booking;
  }
};

const removeBooking = async (userId, eventId) => {
  try {
    await Paricipant.deleteOne({
      user: userId,
      event: eventId,
    });
    await Booking.deleteOne({
      user: userId,
      event: eventId,
    });
    console.log("booking deleted");
  } catch (err) {
    console.log(err);
  }
};

const addParticipant = (eventId, userId) => {
  try {
    const participant = new Paricipant({
      event: eventId,
      user: userId,
    });
    participant.save().then(() => console.log("Participant Created"));
    return participant;
  } catch (err) {
    console.log(err);
  }
};
module.exports = { bookLiveEvent, bookOnlineEvent, removeBooking };
