import { Role } from '../../../../enums/role.enums';
import { apiSlice } from '../../api-slice';

export const superAdminAppointmentApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getPatientAppointmentsListsForSuperAdmin: builder.query({
      query: (id: any) => ({
        url: `${Role.SuperAdmin}/patient/appointment-list/${id}/`,
        method: 'GET',
      }),
      providesTags: ['patients'],
    }),
    getTodayAppointmentListForSuperAdmin: builder.query({
      query: (_: any) => ({
        url: `${Role.SuperAdmin}/appointment/today/`,
        method: 'GET',
      }),
      providesTags: ['appointments'],
    }),
    getPendingAppointmentListForSuperAdmin: builder.query({
      query: (_: any) => ({
        url: `${Role.SuperAdmin}/appointment/pending-appointment/`,
        method: 'GET',
      }),
      providesTags: ['appointments'],
    }),
    getUpcomingAppointmentListForSuperAdmin: builder.query({
      query: (_: any) => ({
        url: `${Role.SuperAdmin}/appointment/upcoming-appointment`,
        method: 'GET',
      }),
      providesTags: ['appointments'],
    }),
    getCompleteAppointmentListForSuperAdmin: builder.query({
      query: (_: any) => ({
        url: `${Role.SuperAdmin}/appointment/complete-appointment/`,
        method: 'GET',
      }),
      providesTags: ['appointments'],
    }),
    getCancelAppointmentListForSuperAdmin: builder.query({
      query: (_: any) => ({
        url: `${Role.SuperAdmin}/appointment/cancel-appointment/`,
        method: 'GET',
      }),
      providesTags: ['appointments'],
    }),
    cancelAppointmentForSuperAdmin: builder.mutation({
      query: (id: number) => ({
        url: `${Role.SuperAdmin}/appointment/cancel/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['appointments'],
    }),
    getReceptionistAppointmentsListsForSuperAdmin: builder.query({
      query: (id: any) => ({
        url: `${Role.SuperAdmin}/receptionist/appointment-list/${id}/`,
        method: 'GET',
      }),
      providesTags: ['receptionists'],
    }),
  }),
});

export const {
  useGetTodayAppointmentListForSuperAdminQuery,
  useGetPendingAppointmentListForSuperAdminQuery,
  useGetUpcomingAppointmentListForSuperAdminQuery,
  useGetCompleteAppointmentListForSuperAdminQuery,
  useGetCancelAppointmentListForSuperAdminQuery,
  useCancelAppointmentForSuperAdminMutation,
  useGetPatientAppointmentsListsForSuperAdminQuery,
  useGetReceptionistAppointmentsListsForSuperAdminQuery,
} = superAdminAppointmentApiSlice;
