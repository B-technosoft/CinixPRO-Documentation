import { Role } from "../../../../enums/role.enums";
import { apiSlice } from "../../api-slice";

export const patient = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPatientListForReceptionis: builder.query({
      query: (args: any) => ({
        url: `${Role.Receptionist}/patient/list/`,
        method: "GET",
        params: args.params,
      }),
      providesTags: ["patients"],
    }),
    addPatientForReceptionis: builder.mutation({
      query: (body: any) => ({
        url: `${Role.Receptionist}/patient/create/`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["patients"],
    }),
    getPatientDetailsForReceptionis: builder.query({
      query: (id: any) => ({
        url: `${Role.Receptionist}/patient/${id}/`,
        method: "GET",
      }),
      providesTags: ["patients"],
    }),
    countPatientTotalAppointmentsForReceptionis: builder.query({
      query: (id: any) => ({
        url: `${Role.Receptionist}/patient/count/${id}/`,
        method: "GET",
      }),
      providesTags: ["patients"],
    }),
    removePatientForReceptionis: builder.mutation({
      query: (id: any) => ({
        url: `${Role.Receptionist}/patient/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["patients"],
    }),
  }),
});

export const {
  useGetPatientListForReceptionisQuery,
  useAddPatientForReceptionisMutation,
  useRemovePatientForReceptionisMutation,
  useGetPatientDetailsForReceptionisQuery,
  useCountPatientTotalAppointmentsForReceptionisQuery,
} = patient;
