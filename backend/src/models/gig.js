const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const gigSchema = mongoose.Schema(
  {
    seller: {
      type: ObjectId,
      ref: 'Seller',
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: {   
      type: ObjectId,
      ref: 'Category', },
    orders: [{
      type: ObjectId,
      ref: 'Order',
    }],
    reviews: [{
      type: ObjectId,
      ref: 'Review',
    }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Gig", gigSchema);
