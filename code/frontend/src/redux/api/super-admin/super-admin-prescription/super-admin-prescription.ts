import { Role } from '../../../../enums/role.enums';
import { apiSlice } from '../../api-slice';

export const superAdminPrescriptionsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getPrescriptionsByPatientIdForSuperAdmin: builder.query({
      query: (id: any) => ({
        url: `${Role.SuperAdmin}/patient/prescription-list/${id}/`,
        method: 'GET',
      }),
      providesTags: ['prescriptions'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetPrescriptionsByPatientIdForSuperAdminQuery } = superAdminPrescriptionsApiSlice;
