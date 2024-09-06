import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const todosApi = createApi({
    reducerPath: 'todos',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://todo-list-backend-nvp1.onrender.com',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;  // Access the auth token from the state
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Todo'],
    endpoints(builder) {
        return {
            // Authentication endpoints
            login: builder.mutation({
                query: (credentials) => ({
                    url: '/api/auth/login',
                    method: 'POST',
                    body: credentials,
                }),
            }),
            register: builder.mutation({
                query: (userData) => ({
                    url: '/api/auth/register',
                    method: 'POST',
                    body: userData,
                    
                }),
            }),
            logout: builder.mutation({
                query: () => ({
                    url: '/api/auth/logout',
                    method: 'POST',
                }),
            }),
            // Todos endpoints
            fetchTodos: builder.query({
                query: () => '/api/todos',
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
        };
    },
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation, useFetchTodosQuery, useAddTodoMutation } = todosApi;
export default todosApi;
