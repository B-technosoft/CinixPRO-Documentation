import { apiSlice } from "../../api-slice";

export const doctorAuthApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginForDoctor: builder.mutation({
      query: (credentials) => ({
        url: "/doctors/login/",
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useLoginForDoctorMutation } = doctorAuthApiSlice;
