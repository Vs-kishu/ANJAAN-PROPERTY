import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loading: false,
  error: null,
};
const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    uploadImagestarted: (state) => {
      state.loading = true;
    },
    uploadImagesDone: (state) => {
      (state.loading = false), (state.error = null);
    },
    uploadImagefailed: (state, action) => {
      (state.loading = false), (state.error = action.payload);
    },
  },
});

export const { uploadImagestarted, uploadImagesDone, uploadImagefailed } =
  propertySlice.actions;

export default propertySlice.reducer;
