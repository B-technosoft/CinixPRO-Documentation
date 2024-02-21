import { Role } from '../../../../enums/role.enums';
import { apiSlice } from '../../api-slice';

export const superAdminDoctorApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getDoctorListForSuperAdmin: builder.query({
      query: (args: any) => ({
        url: `${Role.SuperAdmin}/doctor/list/`,
        method: 'GET',
        params: args.params,
      }),
      providesTags: ['doctors'],
    }),
    addDoctorForSuperAdmin: builder.mutation({
      query: (body: any) => ({
        url: `${Role.SuperAdmin}/doctor/register/`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['doctors'],
    }),
    getDoctorByIdForSuperAdmin: builder.query({
      query: (id: any) => ({
        url: `${Role.SuperAdmin}/doctor/${id}/`,
        method: 'GET',
      }),
      providesTags: ['doctors'],
    }),
    updateDoctorForSuperAdmin: builder.mutation({
      query: (body: any) => {
        return {
          url: `${Role.SuperAdmin}/doctor/update/${+body.get('id')}/`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: ['doctors'],
    }),
    removeDoctorForSuperAdmin: builder.mutation({
      query: (id: any) => ({
        url: `${Role.SuperAdmin}/doctor/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['doctors'],
    }),
  }),
});

export const {
  useGetDoctorListForSuperAdminQuery,
  useAddDoctorForSuperAdminMutation,
  useGetDoctorByIdForSuperAdminQuery,
  useUpdateDoctorForSuperAdminMutation,
  useRemoveDoctorForSuperAdminMutation,
} = superAdminDoctorApiSlice;
