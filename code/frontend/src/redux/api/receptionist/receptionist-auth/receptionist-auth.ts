import { Role } from "../../../../enums/role.enums";
import { apiSlice } from "../../api-slice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginForReceptionist: builder.mutation({
      query: (credentials) => ({
        url: `${Role.Receptionist}/login`,
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useLoginForReceptionistMutation } = authApiSlice;
