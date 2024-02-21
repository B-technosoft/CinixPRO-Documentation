import {
  SuperAuthDataPayloadActionType,
  SuperAuthSliceinterface,
} from "./interface";
import { Storage } from "../../../enums/storage.enums";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const superAdminToken = localStorage.getItem(Storage.SuperAdminToken);

const initialState: SuperAuthSliceinterface = {
  superAdminToken: superAdminToken && JSON.parse(superAdminToken),
};

export const superAuthSlice = createSlice({
  name: "super_auth_slice",
  initialState: initialState,
  reducers: {
    setSuperAuthData(
      state,
      { payload }: PayloadAction<SuperAuthDataPayloadActionType>
    ) {
      localStorage.setItem(
        Storage.SuperAdminToken,
        JSON.stringify(payload.token)
      );

      state.superAdminToken = payload.token;
    },
    cleanSuperAuthData(state) {
      state.superAdminToken = null;

      localStorage.removeItem(Storage.SuperAdminToken);
    },
    cleanSuperLocalStorage(_) {
      localStorage.removeItem(Storage.SuperAdminToken);
    },
  },
});

export const { cleanSuperAuthData, cleanSuperLocalStorage, setSuperAuthData } =
  superAuthSlice.actions;
