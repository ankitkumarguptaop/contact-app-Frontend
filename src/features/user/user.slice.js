import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts } from "./user.action";

const initialState = {
  currentUser:{},
  isLoading: false,
  error: null,
};


export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setCurrentUser :(state ,action)=>{
        state.currentUser =action.payload
    }
  },
});

export default userSlice.reducer;