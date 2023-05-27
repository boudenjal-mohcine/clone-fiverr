import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCategories } from "../api/categoryAPI";

const initialState = {
  cats: [],
  status: "idle",
  error: null,
};

// Get all categories from the API
export const getCats = createAsyncThunk(
  "categories/getAll",
  async (thunkAPI) => {
    try {
      const result = await getCategories();
      return result;
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.message });
    }
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCats.pending, (state, action) => {
        // When data is being fetched
        state.status = "loading";
      })
      .addCase(getCats.fulfilled, (state, action) => {
        // When data is fetched successfully
        state.status = "successful";
        state.cats = action.payload;
      })
      .addCase(getCats.rejected, (state, action) => {
        // When data is fetched unsuccessfully
        state.status = "failed";
        // Update the error message for proper error handling
        state.error = action.error.message;
      });
  },
});

export default categorySlice.reducer;