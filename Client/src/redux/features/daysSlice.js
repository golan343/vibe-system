// //DUCKS pattern
import { createSlice  } from "@reduxjs/toolkit";


const initialState = {
  days: [],
  day: {}
}

export const daysSlice = createSlice({
  name: 'daysSlice',
  initialState,
  reducers: {
    getDays: (state, action) => {
      state.days = action.payload;
    },
    getDay: (state, action) => {
      state.day = action.payload;
    }
  }
});

export const  { getDays } = daysSlice.actions;
export const  { getDay } = daysSlice.actions;



export default daysSlice.reducer;

