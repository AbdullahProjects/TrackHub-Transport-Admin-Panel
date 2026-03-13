import { createSlice } from "@reduxjs/toolkit";

const BusesSlice = createSlice({
  name: "buses",
  initialState: {
    busesData: [],
  },
  reducers: {
    setBusesData(state, action){
        state.busesData = action.payload;
    },
    clearBusesData(state){
        state.busesData = [];
    },
    addBusInExistingData(state, action){
        state.busesData.push(action.payload);
    },
    editBus(state, action){
        const index = state.busesData.findIndex(bus => bus.id === action.payload.id);
        if(index !== -1){
            state.busesData[index] = action.payload;
        }
    },
    deleteBus(state, action){
        state.busesData = state.busesData.filter(bus => bus.id !== action.payload);
    },
    clearDriverFromBusesData(state, action) {
        state.busesData = state.busesData.map((bus) => {
            if (bus.assignedDriverId === action.payload) {
                const { assignedDriverId, ...rest } = bus;
                return rest;
            }
            return bus;
        });
    },
  },
});

export const { setBusesData, clearBusesData, addBusInExistingData, editBus, deleteBus, clearDriverFromBusesData } = BusesSlice.actions;
export default BusesSlice.reducer;
