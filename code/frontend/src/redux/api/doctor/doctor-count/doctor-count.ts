import { Role } from "../../../../enums/role.enums";
import { apiSlice } from "../../api-slice";

export const counts = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCountForDoctor: builder.query({
      query: (_: any) => ({
        url: `${Role.Doctor}/counts/`,
        method: "GET",
      }),
      providesTags: ["appointments"],
    }),
  }),
});

export const { useGetCountForDoctorQuery } = counts;
