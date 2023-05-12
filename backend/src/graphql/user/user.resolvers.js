const User = require("../../models/user");

const queries = {
  users: async () => await User.find().populate('seller').populate('buyer').populate('conversations').exec(),
  user: async (args) => await User.findById(args.id).populate('seller').populate('buyer').populate('conversations').exec(),
};

const mutations = {
  createUser: async (args) => {
    const { username, email, password, profilePicture } = args;
    const user = new User({
        username, email, password, profilePicture
    });
    await user.save();
    return queries.user(user);
}
};

const resolvers = {
  Query: queries,
  Mutation: mutations,
};

module.exports = resolvers;
