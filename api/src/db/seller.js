const mongoose = require("mongoose");

const sellerSchema = mongoose.Schema({
  userId: { type: String, default: "645a3dec8e025bc3697d99bf" },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  skills: {
    type: [String],
    default: [],
  },
},
{ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

module.exports = mongoose.model("Seller", sellerSchema);
