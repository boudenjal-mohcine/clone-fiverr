const Seller = require("../../models/seller");
const Gig = require("../../models/gig");

const queries = {
  sellers: async () => await Seller.find().populate('gigs').exec(),
  seller: async (parent,args) => await Seller.findById(args.id).populate('gigs').exec(),
};

const mutations = {
  createSeller: async (parent, args) => {
    const { first_name, last_name, skills } = args;
    const seller = new Seller({
        first_name, last_name, skills
    });
    await seller.save();
    return queries.seller(parent,seller);
},
updateSeller: async (parent, args) => {
    const { id, ...updatedFields } = args;
    const result = await Seller.findByIdAndUpdate(id, updatedFields, { new: true });
    return await Seller.findByIdAndUpdate(id, updatedFields, { new: true });
},
deleteSeller: async (parent, args) => {
    const { id } = args;
    const seller = await Seller.findByIdAndDelete(id);
    if (!seller) {
        throw new Error(`Seller with ID ${id} not found`);
    }
    await Gig.deleteMany({ seller: seller.id });
    return "Seller deleted successfully"
},
};

const resolvers = {
  Query: queries,
  Mutation: mutations,
};

module.exports = resolvers;
