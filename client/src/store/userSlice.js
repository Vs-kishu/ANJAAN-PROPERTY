import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateUserStarted: (state) => {
      state.loading = true;
    },
    updateUserFinished: (state, action) => {
      (state.currentUser = action.payload), (state.loading = false);
      state.error = null;
    },
    updateFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteUserStarted: (state) => {
      state.loading = true;
    },
    deleteUserFinished: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signoutstarted: (state) => {
      state.loading = true;
    },
    signoutFinished: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    signoutFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateUserStarted,
  updateUserFinished,
  updateFail,
  deleteUserStarted,
  deleteUserFinished,
  deleteFailure,
  signoutstarted,
  signoutFinished,
  signoutFail,
} = userSlice.actions;

export default userSlice.reducer;
