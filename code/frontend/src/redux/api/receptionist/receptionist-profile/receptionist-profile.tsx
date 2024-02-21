import { apiSlice } from "../../api-slice";

export const profile = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfileForReceptionist: builder.query({
      query: () => ({
        url: `receptionists/profile/`,
        method: "GET",
      }),
      providesTags: ["patients"],
    }),
    updateProfilesForReceptionist: builder.mutation({
      query: (body: any) => ({
        url: `receptionists/profile/update`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["profiles"],
    }),
  }),
});

export const {
  useGetProfileForReceptionistQuery,
  useUpdateProfilesForReceptionistMutation,
} = profile;
