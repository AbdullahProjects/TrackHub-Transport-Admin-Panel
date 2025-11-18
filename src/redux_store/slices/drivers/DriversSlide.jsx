import { createSlice } from "@reduxjs/toolkit";

const DriversSlice = createSlice({
  name: "drivers",
  initialState: {
    driversData: [],
  },
  reducers: {
    setDriversData(state, action){
        state.driversData = action.payload;
    },
    clearDriversData(state){
        state.driversData = [];
    },
    editDriver(state, action){
        const index = state.driversData.findIndex(driver => driver.id === action.payload.id);
        if(index !== -1){
            state.driversData[index] = action.payload;
        }
    },
    deleteDriver(state, action){
        state.driversData = state.driversData.filter(driver => driver.id !== action.payload);
    }
  },
});

export const { setDriversData, clearDriversData, editDriver, deleteDriver } = DriversSlice.actions;
export default DriversSlice.reducer;
