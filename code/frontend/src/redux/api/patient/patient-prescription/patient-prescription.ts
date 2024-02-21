import { apiSlice } from '../../api-slice';

export const patientPrescriptionsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getPrescriptionsListForPatient: builder.query({
      query: (args: any) => ({
        url: `patient/prescription/list/`,
        method: 'GET',
        params: args.params,
      }),
      providesTags: ['prescriptions'],
    }),
    prescriptionsPDFForPatient: builder.query({
      query: (fileName: string) => ({
        url: `patient/prescription/send-pdf/${fileName}`,
        method: 'GET',
        responseHandler: async response => URL.createObjectURL(await response.blob()),
      }),
    }),
  }),
});

export const { useGetPrescriptionsListForPatientQuery, usePrescriptionsPDFForPatientQuery } =
  patientPrescriptionsApiSlice;
