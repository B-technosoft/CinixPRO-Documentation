import { apiSlice } from '../../api-slice';

export const patientInvoicesApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getInvoicesListForPatient: builder.query({
      query: (args: any) => ({
        url: `patient/invoice/list`,
        method: 'GET',
        params: args.params,
      }),
      providesTags: ['invoices'],
    }),
    invoicesPDFForPatient: builder.query({
      query: (fileName: string) => ({
        url: `patient/invoice/send-pdf/${fileName}`,
        method: 'GET',
        responseHandler: async response => URL.createObjectURL(await response.blob()),
      }),
      providesTags: ['invoices'],
    }),
  }),
});

export const { useGetInvoicesListForPatientQuery, useInvoicesPDFForPatientQuery } = patientInvoicesApiSlice;
