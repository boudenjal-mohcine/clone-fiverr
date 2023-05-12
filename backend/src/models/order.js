const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const orderSchema = mongoose.Schema(
  {
    buyer: {
      type: ObjectId,
      ref: "Buyer",
      required: true,
    },
    status: { type: String, default: "active" },
    deleveredAt: { type: Date, required: true },
    details: { type: String },
    gig: {
      type: ObjectId,
      ref: "Gig",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
