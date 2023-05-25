const category = require("../src/models/category");
const Gig = require("../src/models/gig")

exports.getGigs = async (req, res, next) => {

    try {
        const gigs = await Gig.find().sort({ 'reviews.length': -1 }).populate('seller').populate('category').exec();
        res.json({ data: gigs, status: "success" });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
}