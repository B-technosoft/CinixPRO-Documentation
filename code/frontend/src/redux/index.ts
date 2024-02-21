import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/api-slice";
import { dialogSlice } from "./features/dialogSlice/dialogSlice";
import { superAuthSlice } from "./features/super_auth_slice/super_auth_slice";
import { doctorAuthSlice } from "./features/doctor_auth_slice/doctor_auth_slice";
import { patientAuthSlice } from "./features/patient_auth_slice/patient_auth_slice";
import { receptionistAuthSlice } from "./features/receptionist_auth_slice/receptionist_auth_slice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    superAuth: superAuthSlice.reducer,
    doctorAuth: doctorAuthSlice.reducer,
    patientAuth: patientAuthSlice.reducer,
    receptionistAuth: receptionistAuthSlice.reducer,
    dialog: dialogSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
