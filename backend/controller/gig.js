const category = require("../src/models/category");
const Gig = require("../src/models/gig");
const review = require("../src/models/review");

exports.getGigs = async (req, res, next) => {

    try {
        const gigs = await Gig.find().sort({ 'reviews.length': -1 }).populate('seller').populate('category').populate('reviews').exec();
        res.json({ data: gigs, status: "success" });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
}