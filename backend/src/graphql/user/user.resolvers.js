const User = require("../../models/user");
const { join, parse } = require("path");
const { GraphQLUpload } = require("graphql-upload");
const { createWriteStream } = require("fs");
const { finished } = require("stream/promises");

const queries = {
  users: async () =>
    await User.find()
      .populate("seller")
      .populate("buyer")
      .populate("conversations")
      .exec(),
  user: async (parent,args) =>
    await User.findById(args.id)
      .populate("seller")
      .populate("buyer")
      .populate("conversations")
      .exec(),
};

const mutations = {
  createUser: async (_, args) => {
    const { username, email, password ,country} = args;
    const picture = await args.profilePicture;

    const { filename, createReadStream } = picture.file;
    let stream = createReadStream();

    let { ext, name } = parse(filename);

    profilePicture =
      name.replace(/([^a-z0-9 ]+)/gi, "-").replace(" ", "_") +
      "-" +
      Date.now() +
      ext;

    let serverFile = join(__dirname, `../../../public/uploads/profiles/${profilePicture}`);

    let writeStream = createWriteStream(serverFile);
    stream.pipe(writeStream);
    await finished(writeStream);

    const user = new User({
      username,
      email,
      password,
      profilePicture,
      country,
    });

    await user.save();
    return queries.user(user);
  },
};

const resolvers = {
  Upload: GraphQLUpload,
  Query: queries,
  Mutation: mutations,
};

module.exports = resolvers;
