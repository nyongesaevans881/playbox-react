import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  token: null,
  user: null,
  isLoginOpen: false,
  isSignUpOpen: false,
};

// Async thunk to load user from local storage on app load
export const loadUserFromStorage = createAsyncThunk(
  "user/loadUserFromStorage",
  async (_, { dispatch }) => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");


    if (token && user) {
      dispatch(setAuthToken(token));
      dispatch(setUserDetails(JSON.parse(user)));
    }
  }
);

// Async thunk to save user to local storage on login
export const saveAuthToStorage = createAsyncThunk(
  "user/saveAuthToStorage",
  async ({ token, user }, { dispatch }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    dispatch(setAuthToken(token));
    dispatch(setUserDetails(user));
  }
);

// Async thunk for logout (clears all session data)
export const logoutUser = createAsyncThunk("user/logoutUser", async (_, { dispatch }) => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  dispatch(clearAuth());
});

// The userSlice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleLogin: (state) => {
      state.isLoginOpen = !state.isLoginOpen;
    },
    toggleSignup: (state) => {
      state.isSignUpOpen = !state.isSignUpOpen;
    },
    setAuthToken: (state, action) => {
      state.token = action.payload;
    },
    setUserDetails: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    clearAuth: (state) => {
      state.token = null;
      state.user = null;
    },
    updateCart: (state, action) => {
      state.user.cart = action.payload;
    },
    updateFavorites: (state, action) => {
      state.user.favorites = action.payload;
    },
    setVerificationStatus: (state, action) => {
      state.user.verified = action.payload;
    },
  },
});

export const {
  setAuthToken,
  setUserDetails,
  clearAuth,
  toggleLogin,
  toggleSignup,
  updateCart,
  updateFavorites,
  setVerificationStatus,
} = userSlice.actions;

export default userSlice.reducer;
