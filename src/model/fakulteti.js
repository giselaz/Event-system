const mongoose = require("mongoose");


const fakultetiSchema = new mongoose.Schema({
  emri:{
    type:String,
    required:true
  },
  pershkrimi:{
    type:String
  },

})



const fakulteti = mongoose.model('Fakultet',fakultetiSchema);

module.exports=fakulteti;