const types = `
scalar DateTime

#typedef
type Gig {
  id: ID!
  sellerId: String!
  title: String!
  description: String!
  price: Float!
  catrgory: String!
  createdAt: DateTime
  updatedAt: DateTime
}

#mutations
type Mutation {
    createGig(sellerId: String, title: String, description: String, price: Float, category: String): Gig
    updateGig(id: ID, title: String, description: String, price: Float, category: String):Gig
    deleteGig(id:ID): Gig
}

#queries
type Query {
    gigs: [Gig] 
    gig(id: ID): Gig
}
`;

module.exports = types;
