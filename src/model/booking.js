const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    event: 
    {type: mongoose.Schema.Types.ObjectId,
    ref:'events',
    required:true
    },
    user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'users',
    required:true
    },
    date:{
        type: Date,
        default: Date.now(),
        required: true,
    },
    status:{
        type:String,
        required:true,
        default:'booked'
    },
    quantity:{
        type:Number,
        default:1,
        required:true
    },
    total_amount:{
        type:Number
    },
    transactionid:{
        type:String
    },
    


})

const bookingModel = mongoose.model('booking',bookingSchema);

module.exports=bookingModel;