const { string } = require("joi");
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  content: {
    type: string,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
  },
});

const commentModel = mongoose.model("Comment", commentSchema);

export default commentModel;
