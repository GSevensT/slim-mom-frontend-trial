import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Optional: import types for better type safety
// import { User, LoginResponse, RegisterResponse } from './types';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (user) => ({
        url: '/users/signup',
        method: 'POST',
        body: user,
      }),
    }),

    logInUser: builder.mutation({
      query: (user) => ({
        url: '/users/login',
        method: 'POST',
        body: user,
      }),
    }),

    logOutUser: builder.mutation({
      query: () => ({
        url: '/users/logout',
        method: 'POST',
      }),
      // Optionally include authorization if needed
      // prepareHeaders: (headers, { getState }) => {
      //   const token = getState().auth.token;
      //   if (token) {
      //     headers.set('authorization', `Bearer ${token}`);
      //   }
      //   return headers;
      // },
    }),

    getUser: builder.query({
      query: (userId) => `/users/current/${userId}`, // Make sure to include the userId correctly
    }),

    updateGoogleUser: builder.mutation({
      query: (user) => ({
        url: '/auth/update/user',
        method: 'POST',
        body: user,
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useRegisterUserMutation,
  useLogInUserMutation,
  useLogOutUserMutation,
  useGetUserQuery,
  useUpdateGoogleUserMutation,
} = authApi;
