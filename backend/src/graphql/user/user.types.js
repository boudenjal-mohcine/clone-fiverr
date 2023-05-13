const types = `
scalar DateTime
scalar Upload

#typedef
type User {
  id: ID!
  seller: Seller
  buyer: Buyer
  username: String!
  email: String!
  password: String!
  isBuyer: Boolean
  isSeller: Boolean
  profilePicture: String
  conversations: [Conversation]
  createdAt: DateTime
  updatedAt: DateTime
}

#mutations
type Mutation {
  createUser(username: String!, email: String!, password: String!, profilePicture: Upload): User
}

#queries
type Query {
    users: [User] 
    user(id: ID): User 
}
`;

module.exports = types;
