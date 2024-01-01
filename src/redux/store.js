// store.js
import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchSlice";
import cartReducer from "./cartSlice";
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    search: searchReducer,
    cart: cartReducer,
    auth: authReducer,
  },
});

export default store;
