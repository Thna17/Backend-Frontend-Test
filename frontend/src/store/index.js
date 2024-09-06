import { configureStore } from "@reduxjs/toolkit";
import todosApi from "./apis/todosApi.js";
import authReducer from './slices/authSlice';
import authApi from './apis/authApi';


export const store = configureStore({
    reducer: {
      [todosApi.reducerPath]: todosApi.reducer,
      [authApi.reducerPath]: authApi.reducer,
      auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authApi.middleware).concat(todosApi.middleware),
  });

export { useFetchTodosQuery, useAddTodoMutation } from './apis/todosApi'
export {  useLoginMutation, useSignupMutation, useLogoutMutation } from './apis/authApi';