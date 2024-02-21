import { Role } from '../../../../enums/role.enums';
import { apiSlice } from '../../api-slice';

export const superAdminReceptionistsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getReceptionistListForSuperAdmin: builder.query({
      query: (args: any) => ({
        url: `${Role.SuperAdmin}/receptionist/list`,
        method: 'GET',
        params: args.params,
      }),
      providesTags: ['receptionists'],
    }),
    getReceptionistByIdForSuperAdmin: builder.query({
      query: (id: any) => ({
        url: `${Role.SuperAdmin}/receptionist/${id}`,
        method: 'GET',
      }),
      providesTags: ['receptionists'],
    }),
    addReceptionistForSuperAdmin: builder.mutation({
      query: (body: any) => ({
        url: `${Role.SuperAdmin}/receptionist/register/`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['receptionists'],
    }),
    updateReceptionistForSuperAdmin: builder.mutation({
      query: (body: FormData) => ({
        url: `${Role.SuperAdmin}/receptionist/update/${body.get('id')}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['receptionists'],
    }),
    removeReceptionistForSuperAdmin: builder.mutation({
      query: (id: any) => ({
        url: `${Role.SuperAdmin}/receptionist/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['receptionists'],
    }),
    countReceptionTotalAppointmentsForSuperAdmin: builder.query({
      query: (id: any) => ({
        url: `${Role.SuperAdmin}/receptionist/count/${id}/`,
        method: 'GET',
      }),
      providesTags: ['receptionists'],
    }),
  }),
});

export const {
  useGetReceptionistListForSuperAdminQuery,
  useAddReceptionistForSuperAdminMutation,
  useGetReceptionistByIdForSuperAdminQuery,
  useRemoveReceptionistForSuperAdminMutation,
  useUpdateReceptionistForSuperAdminMutation,
  useCountReceptionTotalAppointmentsForSuperAdminQuery,
} = superAdminReceptionistsApiSlice;
