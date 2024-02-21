import { apiSlice } from "../api-slice";

export const resetPassword = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    resetPassword: builder.mutation({
      query: (credentials) => ({
        url: "/reset-password/",
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useResetPasswordMutation } = resetPassword;
