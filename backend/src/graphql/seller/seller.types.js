const types = `
scalar DateTime

#typedef
type Seller {
  id: ID!
  user: User!
  first_name: String!
  last_name: String!
  skills: [String]!
  gigs: [Gig]
  createdAt: DateTime
  updatedAt: DateTime
}

#mutations
type Mutation {
  createSeller(first_name: String, last_name: String, skills:[String], user: String!): Seller
  updateSeller(id: ID, first_name: String, last_name: String, skills: [String]):Seller
  #deleteSeller(id:ID): Seller  #we will have a problem if seller deleted
}

#queries
type Query {
    sellers: [Seller] 
    seller(id: ID): Seller 
}
`;

module.exports = types;
