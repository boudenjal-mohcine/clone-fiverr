const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;


const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isSeller: { type: Boolean, default: false },
    profilePicture: { type: String },
    country: { type: String },
    seller: {
      type: ObjectId,
      ref: "Seller",
      required: false,
    },
    buyer: {
      type: ObjectId,
      ref: "Buyer",
      required: false,
    },
    conversations: [
      {
        type: ObjectId,
        ref: "Conversation",
        required: false,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
