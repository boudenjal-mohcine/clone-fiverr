const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const sellerSchema = mongoose.Schema({
  user: {
    type: ObjectId,
    ref: "User",
    required: true
  },  
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  skills: {
    type: [String],
    default: [],
  },
  gigs: [{
    type: ObjectId,
    ref: "Gig",
  }]
},
{ timestamps: true }
);



module.exports = mongoose.model("Seller", sellerSchema);
