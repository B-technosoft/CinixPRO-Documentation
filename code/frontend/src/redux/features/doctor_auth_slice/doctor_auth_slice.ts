import {
  DoctorAuthSliceinterface,
  DoctorAuthDataPayloadActionType,
} from "./interface";
import { Storage } from "../../../enums/storage.enums";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const doctorToken = localStorage.getItem(Storage.DoctorToken);

const initialState: DoctorAuthSliceinterface = {
  doctorToken: doctorToken && JSON.parse(doctorToken),
};

export const doctorAuthSlice = createSlice({
  name: "doctor_auth_slice",
  initialState: initialState,
  reducers: {
    setDoctorAuthData(
      state,
      { payload }: PayloadAction<DoctorAuthDataPayloadActionType>
    ) {
      localStorage.setItem(Storage.DoctorToken, JSON.stringify(payload.token));

      state.doctorToken = payload.token;
    },
    cleanDoctorAuthData(state) {
      state.doctorToken = null;

      localStorage.removeItem(Storage.DoctorToken);
    },
    cleanDoctorLocalStorage(_) {
      localStorage.removeItem(Storage.DoctorToken);
    },
  },
});

export const {
  cleanDoctorAuthData,
  cleanDoctorLocalStorage,
  setDoctorAuthData,
} = doctorAuthSlice.actions;
