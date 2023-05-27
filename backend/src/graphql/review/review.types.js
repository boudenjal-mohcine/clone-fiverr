const types = `
scalar DateTime

#typedef
type Review {
  id: ID!
  gig: Gig!
  user: User!
  rating: Float!
  comment: String
  createdAt: DateTime
  updatedAt: DateTime
}

#mutations
type Mutation {
  createReview(gig: String!, rating: Float, comment: String,  user: String!): Review
}

#queries
type Query {
    reviews: [Review]
    review(id: ID!): Review 
}
`;

module.exports = types;
