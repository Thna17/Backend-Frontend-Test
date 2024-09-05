import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const todosApi = createApi({
    reducerPath: 'todos',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://todo-list-backend-nvp1.onrender.com',
    }),
    tagTypes: ['Todo'],
    endpoints(builder) {
        return {
            fetchTodos: builder.query({
                query: () => {
                    return {
                        url: '/api/todos',
                        method: 'GET',
                    }
                },
                providesTags: (result) =>
                    result
                        ? [...result.map(({ id }) => ({ type: 'Todo', id })), { type: 'Todo', id: 'LIST' }]
                        : [{ type: 'Todo', id: 'LIST' }],
            }),
            
            addTodo: builder.mutation({
                query: (addTodo) => {
                    return {
                        url: `/api/todos`,
                        method: 'POST',
                        body: addTodo
                    }
                },
                invalidatesTags: [{ type: 'Todo', id: 'LIST' }], 
                
            })
        }
    }
})
export const { useFetchTodosQuery, useAddTodoMutation } = todosApi
export default todosApi;