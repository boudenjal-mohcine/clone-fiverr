// Pull in configureStore API
import { configureStore } from '@reduxjs/toolkit';
import gigReducer from './gigSlice';
import categoryReducer from './categorySlice';
import userReducer from './userSlice';
import userGigsReducer from './userGigsSlice';

// Create the Redux store and pass in the postsReducer as the initial data
export const store = configureStore({
  reducer: {
    categories: categoryReducer,
    gigs: gigReducer,
    user : userReducer,
    user_gigs: userGigsReducer,
  },
})