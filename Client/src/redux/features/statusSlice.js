// //DUCKS pattern
import { createSlice  } from "@reduxjs/toolkit";


const initialState = {
  statuses: []
}

export const statusSlice = createSlice({
  name: 'statusSlice',
  initialState,
  reducers: {
    insertStatuses: (state, action) => {
      state.statuses = action.payload;
    }
  }
});

export const  { insertStatuses } = statusSlice.actions;


export default statusSlice.reducer;

