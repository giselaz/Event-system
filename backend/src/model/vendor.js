const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  description:{
    type:String
  },
  logo:{
    type:String,
    required:true
  },
  created_by:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user',
    immutable:true
  },
  
  // events: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Event",
  //   },
  // ],

})



const vendor = mongoose.model('vendor',vendorSchema);

module.exports = vendor;