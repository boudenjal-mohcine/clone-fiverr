const types = `
scalar DateTime

#typedef
type Category {
  id: ID!
  gigs: [Gig]
  label: String!
  createdAt: DateTime
  updatedAt: DateTime
}

#mutations
type Mutation {
  createCategory(label: String!): Category
}

#queries
type Query {
    categories: [Category] 
    category(id: ID!): Category 
}
`;

module.exports = types;
