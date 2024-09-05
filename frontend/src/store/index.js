import { configureStore } from "@reduxjs/toolkit";
import todosApi from "./apis/todosApi.js";



export const store = configureStore({
    reducer: {
      [todosApi.reducerPath]: todosApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(todosApi.middleware),
  });

export { useFetchTodosQuery, useAddTodoMutation } from './apis/todosApi'