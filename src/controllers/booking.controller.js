const BookingService = require('../services/booking.service')



const createBooking =async (req,res)=>{
                const booking = await BookingService.bookLiveEvent(req.user,req.body.eventId,req.body.quantity);
                res.send(booking);
      
     

}



module.exports={createBooking}