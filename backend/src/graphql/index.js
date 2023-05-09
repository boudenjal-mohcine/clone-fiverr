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
      ...Seller.resolvers.queries,
      ...Gig.resolvers.queries,

    },

    Mutation:{
      ...Seller.resolvers.mutations,
      ...Gig.resolvers.mutations,

    }
  
}

module.exports = {resolvers,typeDefs};