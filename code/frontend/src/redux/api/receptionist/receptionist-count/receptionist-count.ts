import { Role } from "../../../../enums/role.enums";
import { apiSlice } from "../../api-slice";

export const counts = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCountForReceptionis: builder.query({
      query: (_: any) => ({
        url: `${Role.Receptionist}/counts/`,
        method: "GET",
      }),
      providesTags: ["appointments"],
    }),
  }),
});

export const { useGetCountForReceptionisQuery } = counts;
