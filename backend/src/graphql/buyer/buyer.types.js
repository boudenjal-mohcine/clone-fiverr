const types = `
scalar DateTime

#typedef
type Buyer {
  id: ID!
  user: User!
  payement_method: String
  orders: [Order]
  createdAt: DateTime
  updatedAt: DateTime
}

#mutations
type Mutation {
  createBuyer(payement_method: String, user:String!): Buyer
  updateBuyer(payement_method: String):Buyer
}

#queries
type Query {
    buyers: [Buyer]
    buyer(id: ID!): Buyer 
}
`;

module.exports = types;
