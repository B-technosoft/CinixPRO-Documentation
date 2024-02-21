import { apiSlice } from '../../api-slice';

export const patientProfileApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getProfileForPatient: builder.query({
      query: () => ({
        url: `patients/profile/`,
        method: 'GET',
      }),
      providesTags: ['profiles'],
    }),
    updateProfileForPatient: builder.mutation({
      query: (body: any) => ({
        url: `patients/profile/update/`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['profiles'],
    }),
  }),
});

export const { useGetProfileForPatientQuery, useUpdateProfileForPatientMutation } = patientProfileApiSlice;
