import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchData: '',
};
const SearchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchProduct: (state, action) => {
      state.searchData = action.payload;
    },
  },
});
export default SearchSlice.reducer;
export const {searchProduct}=SearchSlice.actions;
