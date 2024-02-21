import { Role } from '../../../../enums/role.enums';
import { apiSlice } from '../../api-slice';

export const superAdminCountsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getCountForSuperAdmin: builder.query({
      query: (args: any) => ({
        url: `${Role.SuperAdmin}/counts/`,
        method: 'GET',
        params: args.params,
      }),
      providesTags: ['appointments'],
    }),
  }),
});

export const { useGetCountForSuperAdminQuery } = superAdminCountsApiSlice;
