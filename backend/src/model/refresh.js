const mongoose = require("mongoose");


const refreshTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  created_At: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  user_id:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"users"
  }

});

const refreshToken = mongoose.model('RefreshToken',refreshTokenSchema);

module.exports=refreshToken;
