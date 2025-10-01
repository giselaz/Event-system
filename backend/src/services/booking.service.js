const { v4: uuid } = require("uuid");
const Booking = require("../model/booking");
const Event = require("../model/event");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);


 const stripePayment = async (userEmail, eventId, quantity) => {
  const event = await Event.findById(eventId);
  if (!event.active) {
    throw new Error("Event has ended");
  }

  if (event.fee === 0) {
    return bookFreeEvent(eventId, userId);
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "EUR", 
            product_data: {
              name: event.title,
              description: event.description,
            },
            unit_amount: event.fee * 100, // Stripe works in cents
          },
          quantity,
        },
      ],
      customer_email: userEmail, // you can pass user's email if you have it
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    return { id: session.id, url: session.url };
  } catch (error) {
    console.error("Stripe Session Error:", error);
    throw new Error("Unable to create checkout session");
  }
};

const createBooking = (session) =>
{

}

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
  stripePayment,
  bookOnlineEvent,
  removeBooking,
  addParticipant,
};
