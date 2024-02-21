import { createSlice } from "@reduxjs/toolkit";
import { DialogInterface } from "./interface";

const initialState: DialogInterface = {
  id: 0,
};

export const dialogSlice = createSlice({
  name: "dialog",
  initialState: initialState,
  reducers: {
    setDialogId(state, { payload }) {
      state.id = payload;
    },
    cleanDialogId(state) {
      state.id = 0;
    },
  },
});

export const { cleanDialogId, setDialogId } = dialogSlice.actions;
