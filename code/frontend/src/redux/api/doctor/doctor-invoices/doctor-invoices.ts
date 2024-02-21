import { Role } from "../../../../enums/role.enums";
import { apiSlice } from "../../api-slice";

export const invoices = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInvoicesListForDoctor: builder.query({
      query: (args: any) => ({
        url: `${Role.Doctor}/invoice/list`,
        method: "GET",
        params: args.params,
      }),
      providesTags: ["invoices"],
    }),
    getInvoicesByPatientIdForDoctor: builder.query({
      query: (id: any) => ({
        url: `${Role.Doctor}/patient/invoice-list/${id}/`,
        method: "GET",
      }),
      providesTags: ["invoices"],
    }),
    invoicesPDFForDoctor: builder.query({
      query: (fileName: string) => ({
        url: `${Role.Doctor}/invoice/send-pdf/${fileName}`,
        method: "GET",
        responseHandler: async (response) =>
          URL.createObjectURL(await response.blob()),
      }),
      providesTags: ["invoices"],
    }),
  }),
});

export const {
  useGetInvoicesListForDoctorQuery,
  useGetInvoicesByPatientIdForDoctorQuery,
  useInvoicesPDFForDoctorQuery,
} = invoices;
