const { mongoose } = require("mongoose");
const Conversation = require("../../models/conversation");
const Message = require("../../models/message");
const User = require("../../models/user");

const queries = {
  conversations: async () =>
    await Conversation.find().populate("messages").populate("users").exec(),
  conversation: async (parent,args) => await Conversation.findById(args.id).populate("messages").populate("users").exec(),
};

const mutations = {
  createConversation: async (parent, args) => {
    const { users } = args;
    
    if(users.length!=2){
      throw new Error('conversation require 2 users');
    }

    const conversation = new Conversation({
      users
    });

    
    conversation.users.forEach(async (userId) => {
      const userConversation = await User.findById(userId);
      if (!userConversation) {
        throw new Error(`User with ID ${userId.toString()} not found`);
      }
      userConversation.conversations.push(conversation._id);
      await userConversation.save();
    });
    
    await conversation.save();
   
    return queries.conversation(parent,conversation);
  },
 
  deleteConversation: async (parent, args) => {
    const { id } = args;
    const conversation = await Conversation.findById(id).populate("messages");
    
    if (!conversation) {
      throw new Error(`Conversation with ID ${id} not found`);
    }

      await Message.deleteMany({ conversation: conversation.id });
      
      await conversation.deleteOne();

      return queries.conversation(conversation);

},
};

const resolvers = {
  Query: queries,
  Mutation: mutations,
};

module.exports = resolvers;
