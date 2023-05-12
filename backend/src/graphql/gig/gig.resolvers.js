const { mongoose } = require("mongoose");
const Gig = require("../../models/gig");
const Seller = require("../../models/seller");
const Category = require("../../models/category");

const queries = {
  // gigs: async () => await Gig.find(),
  gigs: async () =>
    await Gig.find()
      .populate("seller")
      .populate("orders")
      .populate("category")
      .populate("reviews")
      .exec(),
  gig: async (parent, args) =>
    await Gig.findById(args.id)
      .populate("seller")
      .populate("orders")
      .populate("category")
      .populate("reviews")
      .exec(),
};

const mutations = {
  createGig: async (parent, args) => {
    const { seller, title, description, price, category } = args;
    const gig = new Gig({
      seller,
      title,
      description,
      price,
      category,
    });
    const gigSeller = await Seller.findById(
      new mongoose.Types.ObjectId(seller).toString()
    );
    if (!gigSeller) {
      throw new Error(`Seller with ID ${seller} not found`);
    }

    const gigCategory = await Category.findById(
      new mongoose.Types.ObjectId(category).toString()
    );

    if (!gigCategory) {
      throw new Error(`Category with ID ${category} not found`);
    }

    await gig.save();

    gigSeller.gigs.push(gig.id);
    gigCategory.gigs.push(gig.id);

    await gigSeller.save();
    await gigCategory.save();

    return queries.gig(parent, gig);
  },

  updateGig: async (parent, args) => {
    const { id, ...updatedFields } = args;
    const result = await Gig.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });
    return result;
  },

  deleteGig: async (parent, args) => {
    const { id } = args;
    const gig = await Gig.findById(id).populate("orders").populate("seller");
    if (!gig) {
      throw new Error(`Gig with ID ${id} not found`);
    }

    if (!gig.orders.some((order) => order.status !== "completed")) {
      const gigSeller = await Seller.findById(
        new mongoose.Types.ObjectId(gig.seller)
      );
      gigSeller.gigs = gigSeller.gigs.filter(
        (gig) => new mongoose.Types.ObjectId(gig).toString() !== id
      );
      await gigSeller.save();
      const gigCategory = await Seller.findById(
        new mongoose.Types.ObjectId(gig.seller)
      );
      gigCategory.gigs = gigCategory.gigs.filter(
        (gig) => new mongoose.Types.ObjectId(gig).toString() !== id
      );

      await gigSeller.save();
      await gigCategory.save();

      await gig.deleteOne();
      return gig;
    } else {
      throw new Error(`Cannot delete Gig ${id}: it has active orders`);
    }
  },
};

const resolvers = {
  Query: queries,
  Mutation: mutations,
};

module.exports = resolvers;
