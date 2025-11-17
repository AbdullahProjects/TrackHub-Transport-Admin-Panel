import { createSlice } from "@reduxjs/toolkit";

const OrganizationSlice = createSlice({
  name: "organization",
  initialState: {
    organizationData: null,
  },
  reducers: {
    setOrganizationData(state, action) {
      state.organizationData = action.payload;
    },
    clearOrganizationData(state) {
      state.organizationData = null;
    },
  },
});


export const { setOrganizationData, clearOrganizationData } = OrganizationSlice.actions;
export default OrganizationSlice.reducer;