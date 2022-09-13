const uuid = require('uuid')
const Booking = require("../model/booking");
const Event = require("../model/event");
const User = require("../model/user")
const stripe = require("stripe")("sk_test_51LaIrHL4LctRSxODoNdV7NbAaxOtllHudT8wPKPWcwKioMoRfnrrski7TS8h1CMVm6QNmkPSDD5C2Yl66zBrEZqx00lcPHW2zX");

const bookLiveEvent = async (user, eventId,quantity,token) => {
  const event = await Event.findById(eventId);
  const userDb = await User.findOne({_id:user._id});
const foundBooking = userDb.bookings.find((booking)=>{
    if(booking.event==eventId)
    return booking;
})
  if(foundBooking || !event){
    throw new Error(' You cannot book event')
  }
  if(event.fee==0){
    const amount =0;
    const booking = new Booking({
      event:eventId,
      user:user._id,
      total_amount:amount,
      quantity
  })
  booking.save().then(() => {
      console.log("Created Booking");
    }).catch((err) => {
      console.log(err);})
  
      // booking.populate([{ path: "event", strictPopulate: false }])
        userDb.bookings.push(booking);
        userDb.save();
      return booking;
  }else{

try{
    const costumer = await stripe.customers.create({
        email:user.email,
        source:token.id
    })
console.log(costumer)
    const payment= await stripe.chargers.create({
        amount:quantity*event.fee*100,
        costumer:costumer.id,
        currency: "ALL",
        receipt_email:user.email
    },
    {
        idempotencyKey:uuid()
    })

    if(payment){
        const booking = new Booking({
            event:eventId,
            user:user._id,
            total_amount:payment.amount,
            quantity,
            transactionid: uuid(),
        })
        (await booking.save()).populate('events').execPopulate();
        userDb.bookings.push(booking);
        userDb.save();
        return booking;
    }
}catch(error){
        return error;
}
}
  

  }
   


const bookOnlineEvent = (user, event) => {};

module.exports ={bookLiveEvent}