import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
  },
  reducers: {
    setProductsData: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { setProductsData } = productSlice.actions;
export default productSlice.reducer;
