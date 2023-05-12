const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

ObjectId.prototype.valueOf = function() { return this.toString(); }

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
    description: { type: String, required: true },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Gig", gigSchema);
