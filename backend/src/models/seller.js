const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

ObjectId.prototype.valueOf = function() { return this.toString(); }

const sellerSchema = mongoose.Schema({
  userId: { type: String, default: "645a3dec8e025bc3697d99bf" },
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
