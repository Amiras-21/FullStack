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


    // getUsers: builder.query({
    //   query: ({ page = 0, pageSize = 5, status, search}) => {
    //     let queryParams = `?page=${page}&pageSize=${pageSize}`;
    //     if (status) queryParams += `&status=${status}`;
    //     if (search) queryParams += `&search=${search}`;

    //     return {
    //       url: `/users${queryParams}`,
    //       method: "GET",
    //     };
    //   },
    //   transformResponse: (response) => ({
    //     users: response.users,
    //     pagination: response.page_information,
    //   }),
    // }),

    getAdmins: builder.query({
      query: ({ page = 0, pageSize = 5, status, search }) => {
        let queryParams = `?page=${page}&pageSize=${pageSize}`;
        if (status) queryParams += `&status=${status}`;
        if (search) queryParams += `&search=${search}`;

        return {
          url: `/admins${queryParams}`,
          method: "GET",
        };
      },
      // transformResponse: (response) => ({
      //   admins: response.results,
      //   pagination: response.page_information,
      // }),
      transformResponse: (response) => {
        console.log("🚀 API Response:", response); // Debugging log
        return {
          results: response.results,  // Ensure this matches the backend response
          pagination: response.pagination,
        };
      },
    }),

    // Fetch Trainers under a specific Admin
    getTrainers: builder.query({
      query: ({ adminId, page = 0, pageSize = 5, status, search }) => {
        let queryParams = `?page=${page}&pageSize=${pageSize}`;
        if (status) queryParams += `&status=${status}`;
        if (search) queryParams += `&search=${search}`;

        return {
          url: `/trainers/admin/${adminId}${queryParams}`,
          method: "GET",
        };
      },
      // transformResponse: (response) => ({
      //   trainers: response.results,
      //   pagination: response.page_information,
      // }),
      transformResponse: (response) => {
        console.log("🚀 API Response:", response); // Debugging log
        return {
          results: response.results,  // Ensure this matches the backend response
          pagination: response.pagination,
        };
      },
    }),

     // Fetch Users under a specific Trainer
     getUsers: builder.query({
      query: ({ trainerId, page = 0, pageSize = 5, status, search }) => {
        let queryParams = `?page=${page}&pageSize=${pageSize}`;
        if (status) queryParams += `&status=${status}`;
        if (search) queryParams += `&search=${search}`;

        return {
          url: `/users/trainer/${trainerId}${queryParams}`,
          method: "GET",
        };
      },
      // transformResponse: (response) => ({
      //   users: response.users,
      //   pagination: response.page_information,
      // }),
      transformResponse: (response) => {
        console.log("🚀 API Response:", response); // Debugging log
        return {
          results: response.results,  // Ensure this matches the backend response
          pagination: response.pagination,
        };
      },
    }),

    getUserById: builder.query({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "GET",
      }),
      transformResponse: (response) => response.results,
    }),

    createAdmin: builder.mutation({
      query: (adminData) => ({
        url: "/admins/create",
        method: "POST",
        body: adminData,
      }),
    }),
    createTrainer: builder.mutation({
      query: (trainerData) => ({
        url: "/trainers/create",
        method: "POST",
        body: trainerData,
      }),
    }),
    createUser: builder.mutation({
      query: (userData) => ({
        url: "/users/create",
        method: "POST",
        body: userData,
      }),
    }),

    
    deleteAdmin: builder.mutation({
      query: (id) => ({
        url: `/admins/${id}`,
        method: "DELETE",
      }),
    }),
    updateAdmin: builder.mutation({
      query: ({ id, ...adminData }) => ({
        url: `/admins/${id}`,
        method: 'PUT',
        body: adminData,
      }),
    }),

    deleteTrainer: builder.mutation({
      query: (id) => ({
        url: `/trainers/${id}`,
        method: "DELETE",
      }),
    }),
    updateTrainer: builder.mutation({
      query: ({ id, ...trainerData }) => ({
        url: `/trainers/${id}`,
        method: 'PUT',
        body: trainerData,
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


export const { useGetUserByIdQuery, useCreateAdminMutation, useCreateTrainerMutation, useCreateUserMutation, useSignupMutation, useLoginUserMutation, useGetUsersQuery, useGetTrainersQuery, useGetAdminsQuery, useAddUserMutation, useDeleteUserMutation, useDeleteAdminMutation, useDeleteTrainerMutation, useUpdateAdminMutation, useUpdateTrainerMutation,  useUpdateUserMutation } = authApi;
