import { apiSlice } from '../../api-slice';

export const patientDoctorApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getDoctorListForPatient: builder.query({
      query: (args: any) => ({
        url: `patient/doctor/list/`,
        method: 'GET',
        params: args.params,
      }),
      providesTags: ['doctors'],
    }),
  }),
});

export const { useGetDoctorListForPatientQuery } = patientDoctorApiSlice;
