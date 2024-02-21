import { Role } from "../../../../enums/role.enums";
import { apiSlice } from "../../api-slice";

export const doctor = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDoctorListForReceptionis: builder.query({
      query: (args: any) => ({
        url: `${Role.Receptionist}/doctor/list/`,
        method: "GET",
        params: args.params,
      }),
      providesTags: ["doctors"],
    }),
    getDoctorDetailsForReceptionis: builder.query({
      query: (id: any) => ({
        url: `${Role.Receptionist}/doctor/${id}/`,
        method: "GET",
      }),
      providesTags: ["doctors"],
    }),
    countDoctorTotalAppointmentsForReceptionis: builder.query({
      query: (id: any) => ({
        url: `${Role.Receptionist}/doctor/count/${id}/`,
        method: "GET",
      }),
      providesTags: ["doctors"],
    }),
    allDoctorListForReceptionis: builder.query({
      query: () => ({
        url: `${Role.Receptionist}/doctor/all-list/`,
        method: "GET",
      }),
      providesTags: ["doctors"],
    }),
  }),
});

export const {
  useGetDoctorListForReceptionisQuery,
  useCountDoctorTotalAppointmentsForReceptionisQuery,
  useGetDoctorDetailsForReceptionisQuery,
  useAllDoctorListForReceptionisQuery,
} = doctor;
