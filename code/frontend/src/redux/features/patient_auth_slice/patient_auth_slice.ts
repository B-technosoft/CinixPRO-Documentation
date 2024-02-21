import {
  PatientAuthSliceinterface,
  PatientAuthDataPayloadActionType,
} from "./interface";
import { Storage } from "../../../enums/storage.enums";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const patientToken = localStorage.getItem(Storage.PatientToken);

const initialState: PatientAuthSliceinterface = {
  patientToken: patientToken && JSON.parse(patientToken),
};

export const patientAuthSlice = createSlice({
  name: "patient_auth_slice",
  initialState: initialState,
  reducers: {
    setPatientAuthData(
      state,
      { payload }: PayloadAction<PatientAuthDataPayloadActionType>
    ) {
      localStorage.setItem(Storage.PatientToken, JSON.stringify(payload.token));

      state.patientToken = payload.token;
    },
    cleanPatientAuthData(state) {
      state.patientToken = null;

      localStorage.removeItem(Storage.PatientToken);
    },
    cleanPatientLocalStorage(_) {
      localStorage.removeItem(Storage.PatientToken);
    },
  },
});

export const {
  cleanPatientAuthData,
  cleanPatientLocalStorage,
  setPatientAuthData,
} = patientAuthSlice.actions;
