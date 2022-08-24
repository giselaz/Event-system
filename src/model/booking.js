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
        type:Date,
        required:true
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

    timestamps:true

})

const bookingModel = mongoose.model('booking',bookingSchema);

module.exports=bookingModel;