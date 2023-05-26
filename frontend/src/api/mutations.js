import { gql } from '@apollo/client';

export const ADD_GIG = gql`
mutation Mutation($seller: String!, $title: String!, $description: String!, $price: Float!, $category: String!, $banner: Upload) {
    createGig(seller: $seller, title: $title, description: $description, price: $price, category: $category, banner: $banner) {
        id
    }
  }
`;