const types = `
scalar DateTime

#typedef
type Conversation {
  id: ID!
  users: [User!]!
  messages: [Message]
  createdAt: DateTime
  updatedAt: DateTime
}

#mutations
type Mutation {
  createConversation(users: [String!]!): Conversation
  deleteConversation(id: ID!):Conversation
}

#queries
type Query {
    conversations: [Conversation]
    conversation(id: ID!): Conversation
    conversationsUser(ids:[ID!]): [Conversation]

}
`;

module.exports = types;
