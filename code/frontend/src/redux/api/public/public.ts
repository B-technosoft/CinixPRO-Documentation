import { apiSlice } from "../api-slice";

export const publics = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGender: builder.query({
      query: () => ({
        url: "/public/gender/",
      }),
    }),
    getAvailableDay: builder.query({
      query: () => ({
        url: "/public/available-day/",
      }),
    }),
    getTimeSlot: builder.query({
      query: () => ({
        url: "/public/time-slot/",
      }),
    }),
    getPaymentStatus: builder.query({
      query: () => ({
        url: "/public/payment-status/",
      }),
    }),
    getPaymentMode: builder.query({
      query: () => ({
        url: "/public/payment-mode/",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAvailableDayQuery,
  useGetGenderQuery,
  useGetTimeSlotQuery,
  useGetPaymentModeQuery,
  useGetPaymentStatusQuery,
} = publics;
