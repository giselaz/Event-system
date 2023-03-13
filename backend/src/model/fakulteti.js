const mongoose = require("mongoose");


const fakultetiSchema = new mongoose.Schema({
  emri:{
    type:String,
    required:true
  },
  pershkrimi:{
    type:String
  },
  logo:{
    type:String,
    required:true
  }
  // events: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Event",
  //   },
  // ],

})



const fakulteti = mongoose.model('Fakultet',fakultetiSchema);

module.exports=fakulteti;