const { mongoose } = require("mongoose");
const Order = require("../../models/order");
const Gig = require("../../models/gig");
const Buyer = require("../../models/buyer");

const queries = {
  orders: async () =>
    await Order.find().populate("gig").populate("buyer").exec(),
  order: async (parent, args) =>
    await Order.findById(args.id).populate("gig").populate("buyer").exec(),
  orderGig: async (parent, args) =>
    await Order.find({ gig: args.gigId })
      .populate("gig")
      .populate("buyer")
      .exec(),
};

const mutations = {
  createOrder: async (parent, args) => {
    const { details, deleveredAt, gig, buyer } = args;
    if (!deleveredAt) {
      throw new Error("Delivered date is required");
    }
    const order = new Order({
      buyer,
      details,
      deleveredAt: new Date(deleveredAt),
      gig,
    });
    await order.save();

    const gigOrdred = await Gig.findById(
      new mongoose.Types.ObjectId(gig).toString()
    );
    const buyerOrdred = await Buyer.findById(
      new mongoose.Types.ObjectId(buyer).toString()
    );

    gigOrdred.orders.push(order._id);
    buyerOrdred.orders.push(order._id);

    await gigOrdred.save();
    await buyerOrdred.save();

    return queries.order(parent, order);
  },

  cancelOrder: async (parent, args) => {
    const { id } = args;
    const order = await Order.findById(id);

    if (!order) {
      throw new Error(`Order with ID ${id} not found`);
    }
    const gigOrdred = await Gig.findById(
      new mongoose.Types.ObjectId(order.gig).toString()
    );

    const buyerOrdred = await Buyer.findById(
      new mongoose.Types.ObjectId(order.buyer).toString()
    );

    await order.deleteOne();

    gigOrdred.orders = gigOrdred.orders.filter(
      (order) => new mongoose.Types.ObjectId(order.id).toString() !== id
    );
    buyerOrdred.orders = buyerOrdred.orders.filter(
      (order) => new mongoose.Types.ObjectId(order.id).toString() !== id
    );

    await gigOrdred.save();
    await buyerOrdred.save();

    return order;
  },

  acceptOrder: async (parent, args) => {
    const { id } = args;
    const order = await Order.findByIdAndUpdate(
      id,
      { status: "in progress" },
      { new: true }
    );
    if (!order) {
      throw new Error(`Order with ID ${id} not found`);
    }
    return queries.order(parent, order);
  },

  completeOrder: async (parent, args) => {
    const { id } = args;
    const order = await Order.findByIdAndUpdate(
      id,
      { status: "completed" },
      { new: true }
    );
    if (!order) {
      throw new Error(`Order with ID ${id} not found`);
    }
    return queries.order(parent, order);
  },

  rejectOrder: async (parent, args) => {
    const { id } = args;
    const order = await Order.findByIdAndUpdate(
      id,
      { status: "revision request" },
      { new: true }
    );
    if (!order) {
      throw new Error(`Order with ID ${id} not found`);
    }
    return queries.order(parent, order);
  },

  deliverOrder: async (parent, args) => {
    const { id } = args;
    const order = await Order.findByIdAndUpdate(
      id,
      { status: "delivered" },
      { new: true }
    );
    if (!order) {
      throw new Error(`Order with ID ${id} not found`);
    }
    return queries.order(parent, order);
  },
};

const resolvers = {
  Query: queries,
  Mutation: mutations,
};

module.exports = resolvers;
