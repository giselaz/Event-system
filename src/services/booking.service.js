const Booking = require("../model/booking");
const Event = require("../model/event");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const bookLiveEvent = (user, eventId,quantity) => {
  const event = Event.findById(eventId);
  if (!event) throw new Error("Event to book does not exist");
  if (event.hyrja == 0) {
  } else {
  }


  return bookingDb;
};

const createCheckout = async (bookings,user)=>{
// const session = await stripe.checkout.sessions.create({
//     payment_method_types:['card'],
//     line_items:
// })
try{
    const costumer = await stripe.customers.create({
        email:user.email,
        source:user.id
    })

    const payment= await stripe.chargers.create({

    })
}
}

const bookOnlineEvent = (user, event) => {};
