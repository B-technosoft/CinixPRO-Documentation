import { apiSlice } from "../../api-slice";

export const superAdminAuthApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    superAdminLogin: builder.mutation({
      query: (credentials) => ({
        url: "/super-admins/login/",
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useSuperAdminLoginMutation } = superAdminAuthApiSlice;
