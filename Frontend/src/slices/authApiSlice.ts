import { apiSlice } from "./apiSlice";
import {
  LOGIN_URL,
  REGISTER_URL,
  LOGOUT_URL,
  PROFILE_URL,
  FORGOT_PASSWORD_URL,
  RESET_PASSWORD_URL,
} from "../constants";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: LOGIN_URL,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    register: builder.mutation({
      query: (data) => ({
        url: REGISTER_URL,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    logout: builder.mutation({
      query: () => ({
        url: LOGOUT_URL,
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),

    getProfile: builder.query({
      query: () => ({
        url: PROFILE_URL,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    forgotPassword: builder.mutation({
      query: (data) => ({
        url: FORGOT_PASSWORD_URL,
        method: "POST",
        body: data,
      }),
    }),

    resetPassword: builder.mutation({
      query: (data) => ({
        url: RESET_PASSWORD_URL,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetProfileQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApiSlice;
