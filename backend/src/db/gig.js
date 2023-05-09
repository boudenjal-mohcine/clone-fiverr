const mongoose = require("mongoose");

const gigSchema = mongoose.Schema({
  sellerId: { type: String, required:true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
},
{ timestamps: true }
);

module.exports = mongoose.model("Gig", gigSchema);
