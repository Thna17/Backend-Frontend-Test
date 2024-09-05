import { configureStore } from "@reduxjs/toolkit";
import todosApi from "./apis/todosApi.js";
import authReducer from './slices/authSlice';

export const store = configureStore({
    reducer: {
      [todosApi.reducerPath]: todosApi.reducer,
      auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(todosApi.middleware),
  });

export { useFetchTodosQuery, useAddTodoMutation } from './apis/todosApi'