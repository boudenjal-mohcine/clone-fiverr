const types = `
scalar DateTime

#typedef
type Gig {
    id: ID!
    seller: Seller!
    orders: [Order]
    reviews: [Review]
    title: String!
    description: String!
    price: Float!
    category: Category!
    createdAt: DateTime
    updatedAt: DateTime
}

#mutations
type Mutation {
    createGig(seller: String!, title: String!, description: String!, price: Float!, category: String!): Gig
    updateGig(id: ID!, title: String, description: String, price: Float): Gig
    deleteGig(id: ID!): Gig
}

#queries
type Query {
    gig(id: ID!): Gig
    gigs: [Gig]
}
`;

module.exports = types;
