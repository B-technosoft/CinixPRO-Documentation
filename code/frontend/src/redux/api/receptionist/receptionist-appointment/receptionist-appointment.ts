import { Role } from "../../../../enums/role.enums";
import { apiSlice } from "../../api-slice";

export const appointment = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllAppointmentListForReceptionis: builder.query({
      query: (args: any) => ({
        url: `${Role.Receptionist}/appointment/list/`,
        method: "GET",
        params: args,
      }),
      providesTags: ["appointments"],
    }),
    getTodayAppointmentListForReceptionis: builder.query({
      query: (_: any) => ({
        url: `${Role.Receptionist}/appointment/today/`,
        method: "GET",
      }),
      providesTags: ["appointments"],
    }),
    getPatientAppointmentsListsForReceptionis: builder.query({
      query: (id: any) => ({
        url: `${Role.Receptionist}/patient/appointment-list/${id}/`,
        method: "GET",
      }),
      providesTags: ["patients"],
    }),
    getDoctorAppointmentsListsForReceptionis: builder.query({
      query: (id: any) => ({
        url: `${Role.Receptionist}/doctor/appointment-list/${id}/`,
        method: "GET",
      }),
      providesTags: ["doctors"],
    }),
    getPendingAppointmentListForReceptionis: builder.query({
      query: (_: any) => ({
        url: `${Role.Receptionist}/appointment/pending-appointment/`,
        method: "GET",
      }),
      providesTags: ["appointments"],
    }),
    getUpcomingAppointmentListForReceptionis: builder.query({
      query: (_: any) => ({
        url: `${Role.Receptionist}/appointment/upcoming-appointment`,
        method: "GET",
      }),
      providesTags: ["appointments"],
    }),
    getCompleteAppointmentListForReceptionis: builder.query({
      query: (_: any) => ({
        url: `${Role.Receptionist}/appointment/complete-appointment/`,
        method: "GET",
      }),
      providesTags: ["appointments"],
    }),
    getCancelAppointmentListForReceptionis: builder.query({
      query: (_: any) => ({
        url: `${Role.Receptionist}/appointment/cancel-appointment/`,
        method: "GET",
      }),
      providesTags: ["appointments"],
    }),
    cancelAppointmentForReceptionis: builder.mutation({
      query: (id: number) => ({
        url: `${Role.Receptionist}/appointment/cancel/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["appointments"],
    }),
    completeAppointmentForReceptionis: builder.mutation({
      query: (id: number) => ({
        url: `${Role.Receptionist}/appointment/complete/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["appointments"],
    }),
    getAppointmentByPatientIdForReceptionis: builder.query({
      query: (id: any) => ({
        url: `${Role.Receptionist}/appointment/patient-appointments/${id}`,
        method: "get",
      }),
      providesTags: ["appointments"],
    }),
    getAppointmentAvailableTimeForReceptionis: builder.query({
      query: (args) => ({
        url: `${Role.Receptionist}/appointment/available-time/${args.doctorId}`,
        method: "get",
        params: {
          appointmentDate: args.appointmentDate,
        },
      }),
      providesTags: ["appointments"],
    }),
    getAppointmentAvailableSlotForReceptionis: builder.query({
      query: (args) => ({
        url: `${Role.Receptionist}/appointment/available-slot/${args.doctorId}/${args.availableTimeId}/`,
        method: "get",
        params: {
          appointmentDate: args.appointmentDate,
        },
      }),
      providesTags: ["appointments"],
    }),
    bookAppointmentForReceptionis: builder.mutation({
      query: (body: any) => ({
        url: `${Role.Receptionist}/appointment/book-appointment/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["appointments"],
    }),
    getAppointmentCalenderForReceptionis: builder.query({
      query: (_) => ({
        url: `${Role.Receptionist}/appointment/list/calender/`,
        method: "get",
      }),
      providesTags: ["appointments"],
    }),
    getAppointmentDoctorAppointmentForReceptionis: builder.query({
      query: (appointmentId) => ({
        url: `${Role.Receptionist}/appointment/doctor-appointment/${appointmentId}`,
        method: "get",
      }),
    }),
  }),
});

export const {
  useGetAllAppointmentListForReceptionisQuery,
  useGetTodayAppointmentListForReceptionisQuery,
  useGetPendingAppointmentListForReceptionisQuery,
  useGetCompleteAppointmentListForReceptionisQuery,
  useGetCancelAppointmentListForReceptionisQuery,
  useCancelAppointmentForReceptionisMutation,
  useCompleteAppointmentForReceptionisMutation,
  useGetAppointmentByPatientIdForReceptionisQuery,
  useGetUpcomingAppointmentListForReceptionisQuery,
  useGetPatientAppointmentsListsForReceptionisQuery,
  useGetAppointmentAvailableTimeForReceptionisQuery,
  useGetAppointmentAvailableSlotForReceptionisQuery,
  useBookAppointmentForReceptionisMutation,
  useGetAppointmentCalenderForReceptionisQuery,
  useGetAppointmentDoctorAppointmentForReceptionisQuery,
  useGetDoctorAppointmentsListsForReceptionisQuery,
} = appointment;
