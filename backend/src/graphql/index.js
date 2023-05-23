const gql = require("graphql-tag");
const Seller = require('./seller')
const Gig = require('./gig')
const Order = require('./order')
const Buyer = require('./buyer')
const Category = require('./category')
const Review = require('./review')
const User = require('./user')
const Conversation = require('./conversation')
const Message = require('./message')

const typeDefs = gql `
    #our types
    ${Seller.types}
    ${Gig.types}
    ${Order.types}
    ${Buyer.types}
    ${Category.types}
    ${Review.types}
    ${User.types}
    ${Message.types}
    ${Conversation.types}


`;

const resolvers = {
    Query: {
      ...Seller.resolvers.Query,
      ...Gig.resolvers.Query,
      ...Order.resolvers.Query,
      ...Buyer.resolvers.Query,
      ...Category.resolvers.Query,
      ...Review.resolvers.Query,
      ...User.resolvers.Query,
      ...Message.resolvers.Query,
      ...Conversation.resolvers.Query,

    },

    Mutation:{
      ...Seller.resolvers.Mutation,
      ...Gig.resolvers.Mutation,
      ...Order.resolvers.Mutation,
      ...Buyer.resolvers.Mutation,
      ...Category.resolvers.Mutation,
      ...Review.resolvers.Mutation,
      ...User.resolvers.Mutation,
      ...Message.resolvers.Mutation,
      ...Conversation.resolvers.Mutation,

    },
}

module.exports = {resolvers,typeDefs};