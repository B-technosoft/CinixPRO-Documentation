import {
  ReceptionistAuthSliceinterface,
  ReceptionistAuthDataPayloadActionType,
} from "./interface";
import { Storage } from "../../../enums/storage.enums";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const receptionistToken = localStorage.getItem(Storage.ReceptionistToken);

const initialState: ReceptionistAuthSliceinterface = {
  receptionistToken: receptionistToken && JSON.parse(receptionistToken),
};

export const receptionistAuthSlice = createSlice({
  name: "receptionist_auth_slice",
  initialState: initialState,
  reducers: {
    setReceptionistAuthData(
      state,
      { payload }: PayloadAction<ReceptionistAuthDataPayloadActionType>
    ) {
      localStorage.setItem(
        Storage.ReceptionistToken,
        JSON.stringify(payload.token)
      );

      state.receptionistToken = payload.token;
    },
    cleanReceptionistAuthData(state) {
      state.receptionistToken = null;

      localStorage.removeItem(Storage.ReceptionistToken);
    },
    cleanReceptionistLocalStorage(_) {
      localStorage.removeItem(Storage.ReceptionistToken);
    },
  },
});

export const {
  cleanReceptionistAuthData,
  cleanReceptionistLocalStorage,
  setReceptionistAuthData,
} = receptionistAuthSlice.actions;
