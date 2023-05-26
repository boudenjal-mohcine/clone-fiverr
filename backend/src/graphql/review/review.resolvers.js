const { mongoose } = require("mongoose");
const Review = require("../../models/review");
const Gig = require("../../models/gig");

const queries = {
  reviews: async () =>
    await Review.find().populate("gig").exec(),
  review: async (parent,args) => await Review.findById(args.id).populate("gig").populate("user").exec(),
};

const mutations = {
  createReview: async (parent, args) => {
    const { gig, comment, rating, user } = args;

    const review = new Review({
      gig, comment, rating, user
    });

    await review.save();

    const gigReviews = await Gig.findById(
      new mongoose.Types.ObjectId(gig).toString()
    );

    gigReviews.reviews.push(review._id);
   
    await gigReviews.save();

    return queries.review(parent,review);
  },

};

const resolvers = {
  Query: queries,
  Mutation: mutations,
};

module.exports = resolvers;
