import { createSlice } from "@reduxjs/toolkit";

const loadCartFromLocalStorage = () => {
  try {
    const serializedCart = localStorage.getItem("cart");
    return serializedCart ? JSON.parse(serializedCart) : [];
  } catch (error) {
    console.error("Error loading cart from local storage:", error);
    return [];
  }
};

const saveCartToLocalStorage = (cart) => {
  try {
    const serializedCart = JSON.stringify(cart);
    localStorage.setItem("cart", serializedCart);
  } catch (error) {
    console.error("Error saving cart to local storage:", error);
  }
};

// cartSlice.js

const cartSlice = createSlice({
  name: "cart",
  initialState: loadCartFromLocalStorage(),
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.find(
        (item) => item.id === action.payload.id
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }

      saveCartToLocalStorage(state);
    },
    removeFromCart: (state, action) => {
      const updatedState = state.filter((item) => item.id !== action.payload);
      saveCartToLocalStorage(updatedState);
      return updatedState;
    },
    decreaseQuantity: (state, action) => {
      const existingProduct = state.find((item) => item.id === action.payload);

      if (existingProduct && existingProduct.quantity > 0) {
        existingProduct.quantity -= 1;
      }

      saveCartToLocalStorage(state);
    },
  },
});

export const { addToCart, removeFromCart, decreaseQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
