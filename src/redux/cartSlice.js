import { createSlice } from "@reduxjs/toolkit";

// Function to load cart from local storage
const loadCartFromLocalStorage = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
};

// Function to save cart to local storage
const saveCartToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const cartSlice = createSlice({
  name: "cart",
  initialState: loadCartFromLocalStorage(),
  reducers: {
    addToCart: (state, action) => {
      state.push({ ...action.payload, quantity: 1 });
      saveCartToLocalStorage(state);
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
