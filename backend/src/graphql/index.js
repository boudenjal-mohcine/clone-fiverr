const gql = require("graphql-tag");
const Seller = require('./seller')
const Gig = require('./gig')

const typeDefs = gql `
    #our types
    ${Seller.types}
    ${Gig.types}
`;

const resolvers = {
    Query: {
      ...Seller.resolvers.Query,
      ...Gig.resolvers.Query,
    },

    Mutation:{
      ...Seller.resolvers.Mutation,
      ...Gig.resolvers.Mutation,
    },
}

module.exports = {resolvers,typeDefs};