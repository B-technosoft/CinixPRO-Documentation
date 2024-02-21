import { Role } from "../../../../enums/role.enums";
import { apiSlice } from "../../api-slice";

export const appointment = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllAppointmentListForDoctor: builder.query({
      query: (args: any) => ({
        url: `${Role.Doctor}/appointment/list/`,
        method: "GET",
        params: args,
      }),
      providesTags: ["appointments"],
    }),
    getTodayAppointmentListForDoctor: builder.query({
      query: (_: any) => ({
        url: `${Role.Doctor}/appointment/today/`,
        method: "GET",
      }),
      providesTags: ["appointments"],
    }),
    getPatientAppointmentsListsForDoctor: builder.query({
      query: (id: any) => ({
        url: `${Role.Doctor}/patient/appointment-list/${id}/`,
        method: "GET",
      }),
      providesTags: ["patients"],
    }),
    getReceptionistAppointmentsListsForDoctor: builder.query({
      query: (id: any) => ({
        url: `${Role.Doctor}/receptionist/appointment-list/${id}/`,
        method: "GET",
      }),
      providesTags: ["receptionists"],
    }),
    getPendingAppointmentListForDoctor: builder.query({
      query: (_: any) => ({
        url: `${Role.Doctor}/appointment/pending-appointment/`,
        method: "GET",
      }),
      providesTags: ["appointments"],
    }),
    getUpcomingAppointmentListForDoctor: builder.query({
      query: (_: any) => ({
        url: `${Role.Doctor}/appointment/upcoming-appointment`,
        method: "GET",
      }),
      providesTags: ["appointments"],
    }),
    getCompleteAppointmentListForDoctor: builder.query({
      query: (_: any) => ({
        url: `${Role.Doctor}/appointment/complete-appointment/`,
        method: "GET",
      }),
      providesTags: ["appointments"],
    }),
    getCancelAppointmentListForDoctor: builder.query({
      query: (_: any) => ({
        url: `${Role.Doctor}/appointment/cancel-appointment/`,
        method: "GET",
      }),
      providesTags: ["appointments"],
    }),
    cancelAppointmentForDoctor: builder.mutation({
      query: (id: number) => ({
        url: `${Role.Doctor}/appointment/cancel/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["appointments"],
    }),
    completeAppointmentForDoctor: builder.mutation({
      query: (id: number) => ({
        url: `${Role.Doctor}/appointment/complete/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["appointments"],
    }),
    getAppointmentByPatientIdForDoctor: builder.query({
      query: (id: number) => ({
        url: `${Role.Doctor}/appointment/patient-appointments/${id}`,
        method: "get",
      }),
      providesTags: ["appointments"],
    }),
    getAppointmentAvailableTimeForDoctor: builder.query({
      query: (args) => ({
        url: `${Role.Doctor}/appointment/available-time/`,
        method: "get",
        params: {
          appointmentDate: args.appointmentDate,
        },
      }),
      providesTags: ["appointments"],
    }),
    getAppointmentAvailableSlotForDoctor: builder.query({
      query: (args) => ({
        url: `${Role.Doctor}/appointment/available-slot/${args.availableTimeId}/`,
        method: "get",
        params: {
          appointmentDate: args.appointmentDate,
        },
      }),
      providesTags: ["appointments"],
    }),
    bookAppointmentForDoctor: builder.mutation({
      query: (body: any) => ({
        url: `${Role.Doctor}/appointment/book-appointment/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["appointments"],
    }),
    getAppointmentCalenderForDoctor: builder.query({
      query: (_) => ({
        url: `${Role.Doctor}/appointment/list/calender/`,
        method: "get",
      }),
      providesTags: ["appointments"],
    }),
  }),
});

export const {
  useGetAllAppointmentListForDoctorQuery,
  useGetTodayAppointmentListForDoctorQuery,
  useGetPendingAppointmentListForDoctorQuery,
  useGetCompleteAppointmentListForDoctorQuery,
  useGetCancelAppointmentListForDoctorQuery,
  useCancelAppointmentForDoctorMutation,
  useCompleteAppointmentForDoctorMutation,
  useGetAppointmentByPatientIdForDoctorQuery,
  useGetUpcomingAppointmentListForDoctorQuery,
  useGetPatientAppointmentsListsForDoctorQuery,
  useGetAppointmentAvailableTimeForDoctorQuery,
  useGetAppointmentAvailableSlotForDoctorQuery,
  useBookAppointmentForDoctorMutation,
  useGetAppointmentCalenderForDoctorQuery,
  useGetReceptionistAppointmentsListsForDoctorQuery,
} = appointment;
