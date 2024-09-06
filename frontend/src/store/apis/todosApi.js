import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const todosApi = createApi({
  reducerPath: 'todosApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://todo-list-backend-nvp1.onrender.com',
    prepareHeaders: (headers, { getState }) => {
        // Get the token from the auth state (you can also use localStorage here)
        const token = getState().auth.token || localStorage.getItem('token');
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
      },
  }),
  tagTypes: ['Todo'],
  endpoints: (builder) => ({
    fetchTodos: builder.query({
      query: () => {
        const userId = localStorage.getItem('userId'); // Fetch userId from localStorage
        return `/api/todos?userId=${userId}`; // Send userId as query param
      },
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Todo', id })), { type: 'Todo', id: 'LIST' }]
          : [{ type: 'Todo', id: 'LIST' }],
    }),
      
    addTodo: builder.mutation({
      query: (newTodo) => ({
        url: '/api/todos',
        method: 'POST',
        body: newTodo,
      }),
      invalidatesTags: [{ type: 'Todo', id: 'LIST' }],
    }),
  }),
});

export const { useFetchTodosQuery, useAddTodoMutation } = todosApi;
export default todosApi;
