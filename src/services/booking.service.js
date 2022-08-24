const Booking = require("../model/booking");
const Event = require("../model/event");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const bookLiveEvent = (user, eventId,quantity) => {
  const event = Event.findById(eventId);
  if (!event) throw new Error("Event to book does not exist");
  if (event.hyrja == 0) {
  } else {
  }
  const bookingDb = booking.create({
    event: event,
    user: user,
    quantity:quantity
  });

  return bookingDb;
};

const createCheckout = async (bookings)=>{
const session = await stripe.checkout.sessions.create({
    payment_method_types:['card'],
    line_items:
})
}

const bookOnlineEvent = (user, event) => {};
