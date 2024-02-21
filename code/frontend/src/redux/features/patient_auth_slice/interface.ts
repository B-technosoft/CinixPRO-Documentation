export interface PatientAuthSliceinterface {
  patientToken: string | null;
}

export type PatientAuthDataPayloadActionType = {
  token: string;
};
