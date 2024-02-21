import { apiSlice } from '../../api-slice';

export const patientCountsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getCountForPatient: builder.query({
      query: (_: any) => ({
        url: `patient/counts/`,
        method: 'GET',
      }),
      providesTags: ['appointments'],
    }),
  }),
});

export const { useGetCountForPatientQuery } = patientCountsApiSlice;
