const { mongoose } = require("mongoose");

const Seller = require("../../models/seller");
const Gig = require("../../models/gig");
const User = require("../../models/user");

const queries = {
  sellers: async () => await Seller.find().populate('gigs').populate('user').exec(),
  seller: async (parent,args) => await Seller.findById(args.id).populate('gigs').populate('user').exec(),
};

const mutations = {
  createSeller: async (parent, args) => {
    const { first_name, last_name, skills, user } = args;
    const seller = new Seller({
        first_name, last_name, skills, user
    });

    const userSeller = await User.findById(
      new mongoose.Types.ObjectId(user).toString() // "objectId('5sh43jekk3.....'))"
    );
    
    if (!userSeller) {
      throw new Error(`User not found`);
    }

    if (userSeller.isSeller) {
      throw new Error(`User already a seller`);
    }

    userSeller.seller = seller._id;
    userSeller.isSeller = true;

    await seller.save();
    await userSeller.save();

    return queries.seller(parent,seller);
},
updateSeller: async (parent, args) => {
    const { id, ...updatedFields } = args;
    const result = await Seller.findByIdAndUpdate(id, updatedFields, { new: true });
    return await Seller.findByIdAndUpdate(id, updatedFields, { new: true });
},
// deleteSeller: async (parent, args) => {
//     const { id } = args;
//     const seller = await Seller.findBy(id);
//     if (!seller) {
//         throw new Error(`Seller with ID ${id} not found`);
//     }
//     await Gig.deleteMany({ seller: seller.id });
//     await seller.deleteOne();
//     return "Seller deleted successfully"
// },
};

const resolvers = {
  Query: queries,
  Mutation: mutations,
};

module.exports = resolvers;
