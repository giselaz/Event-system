const { v4: uuid } = require("uuid");
const Booking = require("../model/booking");
const Event = require("../model/event");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const bookLiveEvent = async (userId, eventId, quantity, token) => {
  const event = await Event.findById(eventId);
  if (!event.active) {
    throw new Error("event has ended");
  }
  if (event.fee == 0) {
    bookFreeEvent(eventId, userId);
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
          user: userId,
          total_amount: event.fee * quantity,
          quantity,
          transactionid: uuid(),
        });
        booking.save().then(() => {
          console.log("Paid booking created");
        });

        return booking.populate("event");
      }
    } catch (error) {
      console.log(error);
    }
  }
};

const bookFreeEvent = (event, userId) => {
  const amount = 0;
  const booking = new Booking({
    event: event,
    user: userId,
    total_amount: amount,
    quantity,
  });
  booking
    .save()
    .then(() => {
      event.participants.push(userId);
    })
    .catch((err) => {
      console.log(err);
    });
  return booking;
};
const bookOnlineEvent = async (userId, eventId) => {
  const event = await Event.findById(eventId);
  // const bookingUser = await Paricipant.findOne({
  //   user: userId,
  //   event: eventId,
  // });
  if (!event.active) {
    throw new Error("Event is no longer active");
  } else if (event.participants.includes(userId)) {
    throw new Error("You are already a participant");
  } else {
    const bookingDb = new Booking({
      event,
      user: userId,
    });

    bookingDb
      .save()
      .then(() => {
        event.participants.push(userId);
      })
      .catch((err) => console.log(err));

    return bookingDb;
  }
};

const removeBooking = async (userId, eventId) => {
  try {
    const event = await Event.findById(eventId);
    const userIndex = event.participants.indexOf(userId);
    if (userIndex) {
      event.participants.splice(userIndex, userId);
    }
    await Booking.deleteOne({
      user: userId,
      event: eventId,
    });
    console.log("booking deleted");
  } catch (err) {
    console.log(err);
  }
};

const addParticipant = async (eventId, userId) => {
  try {
    const event = await Event.findById(eventId);
    event.participants.push(userId);
    return event.participants;
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  bookLiveEvent,
  bookOnlineEvent,
  removeBooking,
  addParticipant,
};
