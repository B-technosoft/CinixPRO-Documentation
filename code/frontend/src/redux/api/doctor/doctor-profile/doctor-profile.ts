import { apiSlice } from "../../api-slice";

export const profile = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfileForDoctor: builder.query({
      query: () => ({
        url: `doctors/profile/`,
        method: "GET",
      }),
      providesTags: ["profiles"],
    }),
    updateProfileForDoctor: builder.mutation({
      query: (body: FormData) => ({
        url: `doctors/profile/update/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["profiles"],
    }),
  }),
});

export const {
  useGetProfileForDoctorQuery,
  useUpdateProfileForDoctorMutation,
} = profile;
