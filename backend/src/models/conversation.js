const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;


// Define the Conversation schema
const conversationSchema = new mongoose.Schema({
    users: [{ type: ObjectId, ref: 'User' }],
    messages: [{ type: ObjectId, ref: 'Message' }]
});

module.exports = mongoose.model("Conversation", conversationSchema);
