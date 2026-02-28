import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { verifyToken } from "../utils/authenticate";

const initialState = {
  isLoggedIn: false,
  userRole: "user",
};

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  try {
    const token = Cookies.get("token");
    if (!token) {
      return { isLoggedIn: false, userRole: "user" };
    }
    const user = await verifyToken(token);
    return {
      isLoggedIn: !!user,
      userRole: user?.role || "user",
    };
  } catch (error) {
    console.error("Failed to verify token:", error);
    return { isLoggedIn: false, userRole: "user" };
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoggedInState: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setUserRole: (state, action) => {
      if (action.payload) {
        state.userRole = action.payload;
      } else {
        state.userRole = "user";
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.userRole = action.payload.userRole;
    });
  },
});

export const { setLoggedInState, setUserRole } = userSlice.actions;
export default userSlice.reducer;
