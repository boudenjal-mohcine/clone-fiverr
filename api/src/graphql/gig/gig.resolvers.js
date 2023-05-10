const { mongoose } = require("mongoose");
const Gig = require("../../db/gig");
const Seller = require("../../db/seller");

const queries = {
  // gigs: async () => await Gig.find(),
  gigs: async () => await Gig.find().populate('seller').exec(),
  gig: async (parent,args) => await Gig.findById(args.id).populate('seller').exec(),
};

const mutations = {
  createGig: async (parent, args) => {
    const { seller, title, description, price, category } = args;
    const gig = new Gig({
        seller: seller,
        title,
        description,
        price,
        category
    });
    const gigresponse = await gig.save();
    const currentSeller = await Seller.findById((new mongoose.Types.ObjectId(seller)).toString())
    console.log(currentSeller);
    currentSeller.gigs.push(gig._id);
    await currentSeller.save();
    return  queries.gig(parent,gig);
},
updateGig: async (parent, args) => {
    const { id, ...updatedFields } = args;
    const result = await Gig.findByIdAndUpdate(id, updatedFields, { new: true });
    return result;
},
deleteGig: async (parent, args) => {
  const { id } = args;
  const gig = await Gig.findByIdAndDelete(id);
  if (!gig) {
    throw new Error(`Gig with ID ${id} not found`);
  }
  return "Gig deleted successfully"
  ;
}
};

const resolvers = {
  Query: queries,
  Mutation: mutations,
  Seller: {
    gigs: async (parent) => {
      const gigs = await Gig.findBySellerId({ id: parent.id });
      console.log(gigs);
      return gigs;
    },
  },
};

module.exports = resolvers;
