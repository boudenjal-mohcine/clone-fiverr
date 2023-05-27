// Pull in configureStore API
import { configureStore } from '@reduxjs/toolkit';
import gigReducer from './gigSlice';
import categoryReducer from './categorySlice';

// Create the Redux store and pass in the postsReducer as the initial data
export const store = configureStore({
  reducer: {
    categories: categoryReducer,
    gigs: gigReducer
  },
})