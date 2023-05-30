import { gql } from "@apollo/client";

export const ADD_GIG = gql`
  mutation Mutation(
    $seller: String!
    $title: String!
    $description: String!
    $price: Float!
    $category: String!
    $banner: Upload
  ) {
    createGig(
      seller: $seller
      title: $title
      description: $description
      price: $price
      category: $category
      banner: $banner
    ) {
      id
    }
  }
`;

export const BECOME_SELLER = gql`
  mutation Mutation(
    $user: String!
    $firstName: String
    $lastName: String
    $skills: [String]
  ) {
    createSeller(
      user: $user
      first_name: $firstName
      last_name: $lastName
      skills: $skills
    ) {
      id
      first_name
      last_name
      skills
      createdAt
    }
  }
`;

export const GET_SELLER = gql`
  query Seller($sellerId: ID) {
    seller(id: $sellerId) {
      first_name
      last_name
      skills
      gigs {
        id
        title
        description
        createdAt
        banner
        price
      }
      id
      user {
        country
        email
        username
        profilePicture
        createdAt
      }
    }
  }
`;

export const DELETE_GIG = gql`
  mutation Mutation($deleteGigId: ID!) {
    deleteGig(id: $deleteGigId) {
      title
    }
  }
`;

export const EDIT_GIG = gql`
  mutation Mutation(
    $updateGigId: ID!
    $banner: Upload
    $title: String
    $description: String
    $price: Float
  ) {
    updateGig(
      id: $updateGigId
      banner: $banner
      title: $title
      description: $description
      price: $price
    ) {
      title
    }
  }
`;

export const MAKE_ORDER = gql`
  mutation Mutation(
    $gig: String!
    $deleveredAt: Date!
    $buyer: String!
    $details: String
  ) {
    createOrder(
      gig: $gig
      deleveredAt: $deleveredAt
      buyer: $buyer
      details: $details
    ) {
      id
    }
  }
`;

export const GET_ORDERS_BUYER = gql`
  query Buyer($buyerId: ID!) {
    buyer(id: $buyerId) {
      payement_method
      orders {
        deleveredAt
        status
        createdAt
        details
        id
      }
    }
  }
`;

export const GET_ORDERS_GIG = gql`
  query Buyer($gigId: ID!) {
    orderGig(gigId: $gigId) {
      details
      status
      buyer {
        id
        payement_method
      }
      deleveredAt
      id
      gig {
        id
      }
    }
  }
`;

export const ACCEPT_ORDER = gql`
  mutation Mutation($acceptOrderId: ID) {
    acceptOrder(id: $acceptOrderId) {
      status
    }
  }
`;

export const CANCEL_ORDER = gql`
  mutation Mutation($cancelOrderId: ID) {
    cancelOrder(id: $cancelOrderId) {
      status
    }
  }
`;

export const COMPLETE_ORDER = gql`
  mutation Mutation($completeOrderId: ID) {
    completeOrder(id: $completeOrderId) {
      status
    }
  }
`;

export const DELIVER_ORDER = gql`
  mutation Mutation($deliverOrderId: ID) {
    deliverOrder(id: $deliverOrderId) {
      status
    }
  }
`;

export const REJECT_ORDER = gql`
  mutation Mutation($rejectOrderId: ID) {
    rejectOrder(id: $rejectOrderId) {
      status
    }
  }
`;

export const ADD_REVIEW = gql`
  mutation CreateReview(
    $gig: String!
    $user: String!
    $comment: String
    $rating: Float
  ) {
    createReview(gig: $gig, user: $user, comment: $comment, rating: $rating) {
      id
    }
  }
`;
