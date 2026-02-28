"use client";
import { configureStore } from "@reduxjs/toolkit";
import { isLoggedIn } from "./userSlice";
import userReducer from "./userSlice";
import blogReducer from "./blogSlice";
import productReducer from "./productSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    blog: blogReducer,
    product: productReducer,
  },
});
