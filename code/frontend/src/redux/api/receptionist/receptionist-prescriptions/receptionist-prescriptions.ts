import { Role } from "../../../../enums/role.enums";
import { apiSlice } from "../../api-slice";

export const prescriptionsReceptionis = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPrescriptionsListForReceptionis: builder.query({
      query: (args: any) => ({
        url: `${Role.Receptionist}/prescription/list/`,
        method: "GET",
        params: args.params,
      }),
      providesTags: ["prescriptions"],
    }),
    getPrescriptionsByPatientIdForReceptionis: builder.query({
      query: (id: any) => ({
        url: `${Role.Receptionist}/patient/prescription-list/${id}/`,
        method: "GET",
      }),
      providesTags: ["prescriptions"],
    }),
    getPrescriptionsByDoctorIdForReceptionis: builder.query({
      query: (id: any) => ({
        url: `${Role.Receptionist}/doctor/prescription-list/${id}/`,
        method: "GET",
      }),
      providesTags: ["prescriptions"],
    }),
    prescriptionsPDFForReceptionis: builder.query({
      query: (fileName: string) => ({
        url: `${Role.Receptionist}/prescription/send-pdf/${fileName}`,
        method: "GET",
        responseHandler: async (response) =>
          URL.createObjectURL(await response.blob()),
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetPrescriptionsListForReceptionisQuery,
  useGetPrescriptionsByPatientIdForReceptionisQuery,
  usePrescriptionsPDFForReceptionisQuery,
  useGetPrescriptionsByDoctorIdForReceptionisQuery,
} = prescriptionsReceptionis;
