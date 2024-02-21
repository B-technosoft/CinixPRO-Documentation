import {
  BaseQueryApi,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootStore } from "..";

export const API_URL = import.meta.env.VITE_API_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: `${API_URL}/api/`,
  prepareHeaders: (header, { getState }) => {
    const state = getState() as RootStore;

    const role = window.location.pathname.split("/")[1];

    let token;

    if (role == "super-admin") {
      const superAdminToken = state.superAuth.superAdminToken;

      token = superAdminToken;
    }

    if (role == "doctor") {
      const doctorToken = state.doctorAuth.doctorToken;

      token = doctorToken;
    }

    if (role == "patient") {
      const patientToken = state.patientAuth.patientToken;

      token = patientToken;
    }

    if (role == "receptionist") {
      const receptionistToken = state.receptionistAuth.receptionistToken;

      token = receptionistToken;
    }

    if (token) {
      header.set("Authorization", `Bearer ${token}`);
    }
  },
});

const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  let result = await baseQuery(args, api, extraOptions);

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (_) => ({}),
  refetchOnReconnect: true,
  refetchOnFocus: true,
  tagTypes: [
    "doctors",
    "patients",
    "receptionists",
    "appointments",
    "prescriptions",
    "invoices",
    "profiles",
  ],
});
