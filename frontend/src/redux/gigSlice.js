import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getGigs } from "../api/gigAPI";

const initialState = {
  gigs: [],
  status: "idle",
  error: null,
};

// Get all categories from the API
export const getAllGigs = createAsyncThunk(
  "gigs/getAll",
  async (thunkAPI) => {
    try {
      const result = await getGigs();
      return result;
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.message });
    }
  }
);

const gigSlice = createSlice({
  name: "gigs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllGigs.pending, (state, action) => {
        // When data is being fetched
        state.status = "loading";
      })
      .addCase(getAllGigs.fulfilled, (state, action) => {
        // When data is fetched successfully
        state.status = "successful";
        state.gigs = action.payload;
      })
      .addCase(getAllGigs.rejected, (state, action) => {
        // When data is fetched unsuccessfully
        state.status = "failed";
        // Update the error message for proper error handling
        state.error = action.error.message;
      });
  },
});

export default gigSlice.reducer;