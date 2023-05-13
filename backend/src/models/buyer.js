const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;


const buyerSchema = mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
      required: true
    },
    payement_method: { type: String },
    orders: [{
      type: ObjectId,
      ref: 'Order',
    }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Buyer", buyerSchema);
