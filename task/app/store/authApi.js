import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/auth' }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (userData) => ({
        url: '/signup',
        method: 'POST',
        body: userData,
      }),
    }),
    addUser: builder.mutation({
      query: (userData) => ({
        url: '/add',
        method: 'POST',
        body: userData,
      }),
    }),
    loginUser: builder.mutation({
      query: (userData) => ({
        url: '/login',
        method: 'POST',
        body: userData,
        headers: { 'Content-Type': 'application/json' },
      }),
    }),
    // getUsers: builder.query({
    //   query: () => ({
    //     url: "/users", // Ensure this API route exists on the backend
    //     method: "GET",
    //   }),
    // }),
    getUsers: builder.query({
      query: ({ page = 0, pageSize = 5, status, search}) => {
        let queryParams = `?page=${page}&pageSize=${pageSize}`;
        if (status) queryParams += `&status=${status}`;
        if (search) queryParams += `&search=${search}`;

        
        
        
        return {
          url: `/users${queryParams}`,
          method: "GET",
        };
      },
      transformResponse: (response) => ({
        users: response.users,
        pagination: response.page_information,
      }),
    }),
    
   
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
    }),
    updateUser: builder.mutation({
      query: ({ id, ...userData }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body: userData,
      }),
    }),
  }),
});


export const { useSignupMutation, useLoginUserMutation, useGetUsersQuery, useAddUserMutation, useDeleteUserMutation,  useUpdateUserMutation } = authApi;
