import { Role } from "../../../../enums/role.enums";
import { apiSlice } from "../../api-slice";

export const doctorPatientApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPatientListForDoctor: builder.query({
      query: (args: any) => ({
        url: `${Role.Doctor}/patient/list/`,
        method: "GET",
        params: args.params,
      }),
      providesTags: ["patients"],
    }),
    addPatientForDoctor: builder.mutation({
      query: (body: any) => ({
        url: `${Role.Doctor}/patient/create/`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["patients"],
    }),
    getPatientDetailsForDoctor: builder.query({
      query: (id: any) => ({
        url: `${Role.Doctor}/patient/${id}/`,
        method: "GET",
      }),
      providesTags: ["patients"],
    }),
    countPatientTotalAppointmentsForDoctor: builder.query({
      query: (id: any) => ({
        url: `${Role.Doctor}/patient/count/${id}/`,
        method: "GET",
      }),
      providesTags: ["patients"],
    }),
    removePatientForDoctor: builder.mutation({
      query: (id: any) => ({
        url: `${Role.Doctor}/patient/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["patients"],
    }),
  }),
});

export const {
  useGetPatientListForDoctorQuery,
  useAddPatientForDoctorMutation,
  useRemovePatientForDoctorMutation,
  useGetPatientDetailsForDoctorQuery,
  useCountPatientTotalAppointmentsForDoctorQuery,
} = doctorPatientApiSlice;
