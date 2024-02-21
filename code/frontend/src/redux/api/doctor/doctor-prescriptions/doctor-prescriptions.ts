import { Role } from "../../../../enums/role.enums";
import { apiSlice } from "../../api-slice";

export const doctorPrescriptions = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPrescriptionsListForDoctor: builder.query({
      query: (args: any) => ({
        url: `${Role.Doctor}/prescription/list/`,
        method: "GET",
        params: args.params,
      }),
      providesTags: ["prescriptions"],
    }),
    addPrescriptionsForDoctor: builder.mutation({
      query: (body: any) => ({
        url: `${Role.Doctor}/prescription/create/`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["prescriptions"],
    }),
    updatePrescriptionsForDoctor: builder.mutation({
      query: (body: any) => ({
        url: `${Role.Doctor}/prescription/update/${body.id}`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["prescriptions"],
    }),
    getPrescriptionByIdForDoctor: builder.query({
      query: (id: any) => ({
        url: `${Role.Doctor}/prescription/${id}`,
        method: "GET",
      }),
    }),
    getPrescriptionsByPatientIdForDoctor: builder.query({
      query: (id: any) => ({
        url: `${Role.Doctor}/patient/prescription-list/${id}/`,
        method: "GET",
      }),
      providesTags: ["prescriptions"],
    }),
    removePrescriptionsForDoctor: builder.mutation({
      query: (id: any) => ({
        url: `${Role.Doctor}/prescription/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["prescriptions"],
    }),
    prescriptionsPDFForDoctor: builder.query({
      query: (fileName: string) => ({
        url: `${Role.Doctor}/prescription/send-pdf/${fileName}`,
        method: "GET",
        responseHandler: async (response) =>
          URL.createObjectURL(await response.blob()),
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetPrescriptionsListForDoctorQuery,
  useAddPrescriptionsForDoctorMutation,
  useRemovePrescriptionsForDoctorMutation,
  useGetPrescriptionsByPatientIdForDoctorQuery,
  usePrescriptionsPDFForDoctorQuery,
  useUpdatePrescriptionsForDoctorMutation,
  useGetPrescriptionByIdForDoctorQuery,
} = doctorPrescriptions;
