import { createAsyncThunk,createSlice } from '@reduxjs/toolkit';
import { createSelector } from '@reduxjs/toolkit';

const initialState = {
    gigs: [],
    status: "idle",
  };

export const getGigs = createAsyncThunk(
  'user_gigs/getGigs',
  async (gigsData, thunkAPI) => {
    return gigsData; // Return the static data as the response
  }
);


export const addGig = createAsyncThunk(
    'user_gigs/addGig',
    async (gig, thunkAPI) => {
      return gig; // Return the static data as the response
    }
  );

const userGigsSlice = createSlice({
    name: 'user_gigs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
      .addCase(getGigs.fulfilled, (state, action) => {
        state.status = "successful";
        state.gigs = action.payload;
      })
      .addCase(addGig.fulfilled, (state, action) => {
          state.status = "successful";
          state.gigs.push(action.payload);
      });
    },
  });

  
// Selector function to retrieve gigs from the user_gigs slice
export const selectGigs = createSelector(
  (state) => state.user_gigs, // Selector function to get the user_gigs slice from the state
  (userGigs) => userGigs // Return the gigs data from the user_gigs slice
);
  
  export const { } = userGigsSlice.actions;
  export default userGigsSlice.reducer;