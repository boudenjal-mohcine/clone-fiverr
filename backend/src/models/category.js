const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;


const categorySchema = mongoose.Schema(
  {
    gigs: [{
      type: ObjectId,
      ref: 'Gig',
    }],
    label: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
