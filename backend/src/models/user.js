const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const uniqueValidator = require('mongoose-unique-validator');

ObjectId.prototype.valueOf = function () {
  return this.toString();
};

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isBuyer: { type: Boolean, default: false },
    isSeller: { type: Boolean, default: false },
    profilePicture: { type: String },
    seller: {
      type: ObjectId,
      ref: "Seller",
      required: false
    },
    buyer: {
      type: ObjectId,
      ref: "Buyer",
      required: false
    },
  },
  { timestamps: true }
);
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);