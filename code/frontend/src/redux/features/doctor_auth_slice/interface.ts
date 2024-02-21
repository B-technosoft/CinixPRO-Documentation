export interface DoctorAuthSliceinterface {
  doctorToken: string | null;
}

export type DoctorAuthDataPayloadActionType = {
  token: string;
};
