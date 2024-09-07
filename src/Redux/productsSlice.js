import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  loading: false,
  error: "",
};
const ProductSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(FetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(FetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.products;
      })
      .addCase(FetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const FetchProducts = createAsyncThunk("products/fetchproducts", async () => {
  const res=await axios.get('https://dummyjson.com/products');
  console.log(res);
  return res.data;

    
});
export default ProductSlice.reducer;
