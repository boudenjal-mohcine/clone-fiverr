const { mongoose } = require("mongoose");
const Conversation = require("../../models/conversation");
const User = require("../../models/user");
const Message = require("../../models/message");

const queries = {
  messages: async () =>
    await Message.find().populate("conversation").populate("user").exec(),
  message: async (parent, args) =>
    await Message.findById(args.id)
      .populate("conversation")
      .populate("user")
      .exec(),
};

const mutations = {
  createMessage: async (parent, args) => {
    const { conversation, content, user } = args;

    const senderMessage = await User.findById(
      new mongoose.Types.ObjectId(user).toString()
    );

    if (!senderMessage) {
      throw new Error(` User with  This ID ${user} not found `);
    }

    const message = new Message({
      conversation,
      content,
      user,
      senderUsername: senderMessage.username,
    });

    const conversationMessage = await Conversation.findById(
      new mongoose.Types.ObjectId(conversation).toString()
    );

    if (!conversationMessage) {
      throw new Error(`Conversation with ID ${conversation} not found`);
    }

    conversationMessage.messages.push(message._id);

    await message.save();

    await conversationMessage.save();

    return queries.message(parent, message);
  },

  deleteMessage: async (parent, args) => {
    const { id } = args;
    const message = await Message.findById(id).populate("conversation");
    if (!message) {
      throw new Error(`Message with ID ${id} not found`);
    }

    if (message.status != "read") {
      const conversationMessage = await Conversation.findById(
        new mongoose.Types.ObjectId(message.conversation)
      );
      conversationMessage.messages = conversationMessage.messages.filter(
        (message) => new mongoose.Types.ObjectId(message).toString() !== id
      );
      await conversationMessage.save();

      await message.deleteOne();

      return message;
    } else {
      throw new Error(`Cannot delete Message ${id} because his status is read`);
    }
  },
  
  markAsReadMessage: async (parent, args) => {

    const { id } = args;
    const message = await Message.findByIdAndUpdate(
      id,
      { status: 'read' },
      { new: true }
    );
    //The third parameter { new: true } ensures that the updated document is returned.

    if (!message) {
      throw new Error(`Message with ID ${id} not found`);
    }
    return queries.message(parent,message);
  }


};

const resolvers = {
  Query: queries,
  Mutation: mutations,
};

module.exports = resolvers;
