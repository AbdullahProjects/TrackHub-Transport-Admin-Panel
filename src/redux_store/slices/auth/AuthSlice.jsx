import { createSlice } from "@reduxjs/toolkit";
import { setLogLevel } from "firebase/app";
import { AdminModel } from "../../../pages/login/model/AdminModel";

const adminSlice = createSlice({
  name: "auth",
  initialState: {
    adminData: null,
    loading: true,
  },
  reducers: {
    setAdminData: (state, action) => {
      state.adminData = { ...action.payload };
    },
    clearAdminData: (state) => {
      state.adminData = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setAdminData, clearAdminData, setLoading } = adminSlice.actions;
export default adminSlice.reducer;
