export interface SuperAuthSliceinterface {
  superAdminToken: string | null;
}

export type SuperAuthDataPayloadActionType = {
  token: string;
};
