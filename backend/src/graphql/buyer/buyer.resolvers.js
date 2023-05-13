const { mongoose } = require("mongoose");
const Buyer = require("../../models/buyer");
const User = require("../../models/user");

const queries = {
  buyers: async () =>
    await Buyer.find().populate("orders").populate("user").exec(),
  buyer: async (parent,args) => await Buyer.findById(args.id).populate("orders").populate("user").exec(),
};

const mutations = {
  createBuyer: async (parent, args) => {
    const { payement_method,user } = args;
    const buyer = new Buyer({
      payement_method,user
    });
    const userBuyer = await User.findById(
      new mongoose.Types.ObjectId(user).toString()
    );

    if (!userBuyer) {
      throw new Error(`User with ID ${user} not found`);
    }

    if (userBuyer.isBuyer) {
      throw new Error(`User already a buyer`);
    }

    userBuyer.buyer = buyer._id;
    userBuyer.isBuyer = true;

    await buyer.save();

    await userBuyer.save()
   
    return queries.buyer(parent,buyer);
  },

  updateBuyer: async (parent, args) => {
    const { id, ...updatedFields } = args;
    return await Buyer.findByIdAndUpdate(id, updatedFields, { new: true });
},
};

const resolvers = {
  Query: queries,
  Mutation: mutations,
};

module.exports = resolvers;
