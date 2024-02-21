import { Role } from '../../../../enums/role.enums';
import { apiSlice } from '../../api-slice';

export const superAdminInvoicesApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getInvoicesByPatientIdForSuperAdmin: builder.query({
      query: (id: any) => ({
        url: `${Role.SuperAdmin}/patient/invoice-list/${id}/`,
        method: 'GET',
      }),
      providesTags: ['invoices'],
    }),
  }),
});

export const { useGetInvoicesByPatientIdForSuperAdminQuery } = superAdminInvoicesApiSlice;
