const Gig = require("../../models/gig");

const queries = {
    gigs: async () => await Gig.find(),
    gig: async (parent,args) => await Gig.findById(args.id).then().catch((error)=>"not found"),
};
  
const mutations = {
    createGig: async (parent, args) => {
        const { sellerId,title,description,price,category } = args;
        const gig = new Gig({
            sellerId,title,description,price,category
        });
        await gig.save();
        return gig;
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
        return gig;
      },
  };

const resolvers = {queries,mutations}
  
module.exports =  resolvers ;