const types = `
scalar DateTime
scalar Upload


#typedef
type Gig {
    id: ID!
    seller: Seller!
    orders: [Order]
    reviews: [Review]
    banner: String
    title: String!
    description: String!
    price: Float!
    category: Category!
    createdAt: DateTime
    updatedAt: DateTime
}

#mutations
type Mutation {
    createGig(seller: String!,banner: Upload, title: String!, description: String!, price: Float!, category: String!): Gig
    updateGig(id: ID!,banner: Upload, title: String, description: String, price: Float): Gig
    deleteGig(id: ID!): Gig
}

#queries
type Query {
    gig(id: ID!): Gig
    gigs: [Gig]
}
`;

module.exports = types;
