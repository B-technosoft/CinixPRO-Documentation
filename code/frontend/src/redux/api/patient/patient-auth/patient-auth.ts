import { apiSlice } from '../../api-slice';

export const patientAuthApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    patientLoginForPatient: builder.mutation({
      query: credentials => ({
        url: '/patients/login/',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    patientSignUpForPatient: builder.mutation({
      query: credentials => ({
        url: '/patients/register/',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
  }),
});

export const { usePatientLoginForPatientMutation, usePatientSignUpForPatientMutation } = patientAuthApiSlice;
