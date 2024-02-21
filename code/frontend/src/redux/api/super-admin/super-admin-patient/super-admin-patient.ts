import { Role } from '../../../../enums/role.enums';
import { apiSlice } from '../../api-slice';

export const superAdminPatientApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getPatientListForSuperAdmin: builder.query({
      query: (args: any) => ({
        url: `${Role.SuperAdmin}/patient/list/`,
        method: 'GET',
        params: args.params,
      }),
      providesTags: ['patients'],
    }),
    addPatientForSuperAdmin: builder.mutation({
      query: (body: any) => ({
        url: `${Role.SuperAdmin}/patient/register/`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['patients'],
    }),
    getPatientDetailsForSuperAdmin: builder.query({
      query: (id: any) => ({
        url: `${Role.SuperAdmin}/patient/${id}/`,
        method: 'GET',
      }),
      providesTags: ['patients'],
    }),
    updatePatientForSuperAdmin: builder.mutation({
      query: (body: FormData) => ({
        url: `${Role.SuperAdmin}/patient/update/${body.get('id')}/`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['patients'],
    }),
    removePatientForSuperAdmin: builder.mutation({
      query: (id: any) => ({
        url: `${Role.SuperAdmin}/patient/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['patients'],
    }),
    countPatientTotalAppointmentsForSuperAdmin: builder.query({
      query: (id: any) => ({
        url: `${Role.SuperAdmin}/patient/count/${id}/`,
        method: 'GET',
      }),
      providesTags: ['patients'],
    }),
  }),
});

export const {
  useGetPatientListForSuperAdminQuery,
  useAddPatientForSuperAdminMutation,
  useRemovePatientForSuperAdminMutation,
  useGetPatientDetailsForSuperAdminQuery,
  useUpdatePatientForSuperAdminMutation,
  useCountPatientTotalAppointmentsForSuperAdminQuery,
} = superAdminPatientApiSlice;
