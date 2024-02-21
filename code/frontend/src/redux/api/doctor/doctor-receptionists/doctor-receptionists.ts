import { Role } from "../../../../enums/role.enums";
import { apiSlice } from "../../api-slice";

export const receptionists = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReceptionistListForDoctor: builder.query({
      query: (args: any) => ({
        url: `${Role.Doctor}/receptionist/list`,
        method: "GET",
        params: args.params,
      }),
      providesTags: ["receptionists"],
    }),
    getReceptionistByIdForDoctor: builder.query({
      query: (id: any) => ({
        url: `${Role.Doctor}/receptionist/${id}`,
        method: "GET",
      }),
      providesTags: ["receptionists"],
    }),
    countReceptionTotalAppointmentsForDoctor: builder.query({
      query: (id: any) => ({
        url: `${Role.Doctor}/receptionist/count/${id}/`,
        method: "GET",
      }),
      providesTags: ["patients"],
    }),
  }),
});

export const {
  useGetReceptionistListForDoctorQuery,
  useGetReceptionistByIdForDoctorQuery,
  useCountReceptionTotalAppointmentsForDoctorQuery,
} = receptionists;
