// //DUCKS pattern
import { createSlice  } from "@reduxjs/toolkit";


const initialState = {
  user: null
}

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    logout: () => initialState,
    login: (state, action) => {
      state.auth = action.payload;
    }
  }
});

export const  { login, logout } = userSlice.actions;


export default userSlice.reducer;

