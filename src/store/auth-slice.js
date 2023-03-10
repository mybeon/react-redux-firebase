import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  notification: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
    },
    addNotification(state, action) {
      state.notification = action.payload;
    },
    removeNotification(state) {
      state.notification = null;
    },
    setUsername(state, action) {
      state.user.name = action.payload;
    },
  },
});

export const { login, logout, addNotification, removeNotification, setUsername } = authSlice.actions;

export default authSlice.reducer;
