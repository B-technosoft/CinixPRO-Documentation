import { apiSlice } from '../../api-slice';

export const superAdminProfileApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getProfileForSuperAdmin: builder.query({
      query: () => ({
        url: `super-admin/profile/`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetProfileForSuperAdminQuery } = superAdminProfileApiSlice;
