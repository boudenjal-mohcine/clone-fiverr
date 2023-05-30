const types = `
scalar DateTime
scalar Date

#typedef
type Order {
  id: ID!
  buyer: Buyer!
  gig: Gig!
  status: String!
  details: String
  deleveredAt: Date!
  createdAt: DateTime
  updatedAt: DateTime
}

#mutations
type Mutation {
  createOrder(gig: String!, details: String, deleveredAt: Date!, buyer: String!): Order #status active
  acceptOrder(id: ID):Order                                             #status in progress
  deliverOrder(id: ID):Order                                            #status delivered
  rejectOrder(id:ID): Order                                             #status in revision
  completeOrder(id:ID): Order                                           #status completed
  cancelOrder(id:ID): Order                                             #delete order
}

#queries
type Query {
    orders: [Order]
    order(id: ID!): Order 
    orderGig(gigId: ID!): [Order] 

}
`;

module.exports = types;
