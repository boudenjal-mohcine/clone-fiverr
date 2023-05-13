const types = `
scalar DateTime

#typedef
type Message {
  id: ID!
  conversation: Conversation!
  user: User!
  senderUsername: String
  content: String!
  status: String
  createdAt: DateTime
  updatedAt: DateTime
}

#mutations
type Mutation {
  createMessage(user: String!, conversation: String!, content: String!): Message
  markAsReadMessage(id: ID!):Message
  deleteMessage(id: ID!):Message
}

#queries
type Query {
    messages: [Message]
    message(id: ID!): Message 
}
`;

module.exports = types;
