import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    userId: null,
    isAuthenticated: false,
  },
  reducers: {
    setCredentials: (state, { payload }) => {
        state.token = payload.token;
        state.userId = payload.userId; // Ensure `userId` is stored
        state.isAuthenticated = true;
      },
    logout: (state) => {
      state.token = null;
      state.userId = null; // Clear userId on logout
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
