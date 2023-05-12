const Seller = require("../../models/seller");


const queries = {
    sellers: async () => await Seller.find(),
    seller: async (parent,args) => await Seller.findById(args.id).then().catch((error)=>"not found"),
};
  
const mutations = {
    createSeller: async (parent, args) => {
        const { first_name, last_name, skills } = args;
        const seller = new Seller({
            first_name, last_name, skills
        });
        await seller.save();
        return seller;
      },
      updateSeller: async (parent, args) => {
        const { id, ...updatedFields } = args;
        const result = await Seller.findByIdAndUpdate(id, updatedFields, { new: true });
        return result;
      },

      deleteSeller: async (parent, args) => {
        const { id } = args;
        const seller = await Seller.findByIdAndDelete(id);
        if (!seller) {
          throw new Error(`Seller with ID ${id} not found`);
        }
        return seller;
      },
};

const resolvers = {queries,mutations}
  
module.exports =  resolvers ;