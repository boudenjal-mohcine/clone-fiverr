const types = `
scalar DateTime

#typedef
type Review {
  id: ID!
  gig: Gig!
  userId: String
  rating: Float!
  comment: String
  createdAt: DateTime
  updatedAt: DateTime
}

#mutations
type Mutation {
  createReview(gig: String!, rating: Float, comment: String): Review
}

#queries
type Query {
    reviews: [Review]
    review(id: ID!): Review 
}
`;

module.exports = types;
