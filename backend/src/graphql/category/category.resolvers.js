const { mongoose } = require("mongoose");
const Gig = require("../../models/gig");
const Category = require("../../models/category");

const queries = {
  categories: async () =>
    await Category.find().populate("gigs").exec(),
  category: async (parent, args) =>
    await Category.findById(args.id).populate("gigs").exec(),
};

const mutations = {
  createCategory: async (parent, args) => {
    const { label } = args;
    const category = new Category({
     label
    });
    await category.save();
    return queries.category(parent, category);
  },
};

const resolvers = {
  Query: queries,
  Mutation: mutations,
};

module.exports = resolvers;