import { Role } from "../../../../enums/role.enums";
import { apiSlice } from "../../api-slice";

export const invoices = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInvoicesListForReceptionis: builder.query({
      query: (args: any) => ({
        url: `${Role.Receptionist}/invoice/list`,
        method: "GET",
        params: args.params,
      }),
      providesTags: ["invoices"],
    }),
    addInvoicesForReceptionis: builder.mutation({
      query: (body: any) => ({
        url: `${Role.Receptionist}/invoice/create/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["invoices"],
    }),
    getInvoiceByIdForReceptionis: builder.query({
      query: (id: number) => ({
        url: `${Role.Receptionist}/invoice/${id}`,
        method: "GET",
      }),
      providesTags: ["invoices"],
    }),
    updateInvoiceByIdForReceptionis: builder.mutation({
      query: (body: any) => ({
        url: `${Role.Receptionist}/invoice/update/${body.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["invoices"],
    }),
    removeInvoicesForReceptionis: builder.mutation({
      query: (id: any) => ({
        url: `${Role.Receptionist}/invoice/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["invoices"],
    }),
    getInvoicesByPatientIdForReceptionis: builder.query({
      query: (id: any) => ({
        url: `${Role.Receptionist}/patient/invoice-list/${id}/`,
        method: "GET",
      }),
      providesTags: ["invoices"],
    }),
    getInvoicesByDoctorIdForReceptionis: builder.query({
      query: (id: any) => ({
        url: `${Role.Receptionist}/doctor/invoice-list/${id}/`,
        method: "GET",
      }),
      providesTags: ["invoices"],
    }),
    invoicesPDFForReceptionis: builder.query({
      query: (fileName: string) => ({
        url: `${Role.Receptionist}/invoice/send-pdf/${fileName}`,
        method: "GET",
        responseHandler: async (response) =>
          URL.createObjectURL(await response.blob()),
      }),
      providesTags: ["invoices"],
    }),
  }),
});

export const {
  useGetInvoicesListForReceptionisQuery,
  useGetInvoiceByIdForReceptionisQuery,
  useGetInvoicesByPatientIdForReceptionisQuery,
  useGetInvoicesByDoctorIdForReceptionisQuery,
  useAddInvoicesForReceptionisMutation,
  useUpdateInvoiceByIdForReceptionisMutation,
  useRemoveInvoicesForReceptionisMutation,
  useInvoicesPDFForReceptionisQuery,
} = invoices;
