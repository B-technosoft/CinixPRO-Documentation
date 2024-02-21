import { apiSlice } from "../../api-slice";

export const patientAppointmentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllAppointmentListForPatient: builder.query({
      query: (args: any) => ({
        url: `patient/appointment/list/`,
        method: "GET",
        params: args,
      }),
      providesTags: ["appointments"],
    }),
    cancelAppointmentForPatient: builder.mutation({
      query: (id: number) => ({
        url: `/patient/appointment/cancel/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["appointments"],
    }),
    createAppointmentForPatient: builder.mutation({
      query: (body: any) => ({
        url: "patient/appointment/book-appointment/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["appointments"],
    }),
    getAppointmentAvailableTimeForPatient: builder.query({
      query: (args) => ({
        url: `patient/appointment/doctor-available-time/${args.id}/`,
        method: "get",
        params: {
          appointmentDate: args.appointmentDate,
        },
      }),
      providesTags: ["appointments"],
    }),
    getAppointmentAvailableSlotForPatient: builder.query({
      query: (args) => ({
        url: `patient/appointment/available-slot/${args.doctorId}/${args.availableTimeId}/`,
        method: "get",
        params: {
          appointmentDate: args.appointmentDate,
        },
      }),
      providesTags: ["appointments"],
    }),
    getAppointmentCalenderForPatient: builder.query({
      query: (_) => ({
        url: `patient/appointment/list/calender/`,
        method: "get",
      }),
      providesTags: ["appointments"],
    }),
  }),
});

export const {
  useGetAllAppointmentListForPatientQuery,
  useCancelAppointmentForPatientMutation,
  useCreateAppointmentForPatientMutation,
  useGetAppointmentAvailableTimeForPatientQuery,
  useGetAppointmentAvailableSlotForPatientQuery,
  useGetAppointmentCalenderForPatientQuery,
} = patientAppointmentApiSlice;
