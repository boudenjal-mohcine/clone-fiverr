const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;


const reviewSchema = mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
      required: true
    },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
    gig: 
      {
        type: ObjectId,
        ref: "Gig",
      },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
