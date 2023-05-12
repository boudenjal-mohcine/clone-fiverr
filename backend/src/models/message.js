const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

// Define the Message schema
const messageSchema = new mongoose.Schema(
  {
    conversation: { type: ObjectId, ref: "Conversation" },
    user: { type: ObjectId, ref: "User" },
    senderUsername: {type:String, required:true},
    content: { type: String, required: true },
    status: {type: String, required: true, default:"sent"}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
