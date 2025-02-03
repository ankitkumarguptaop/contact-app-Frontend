import { createSlice } from "@reduxjs/toolkit";
import { listRelation } from "./relation.action";

const initialState = {
    relations: [],
    isLoading: false,
    error: null,
  };


  export const relationSlice = createSlice({
    name: "relations",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(listRelation.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(listRelation.fulfilled, (state, action) => {
          state.isLoading = false;
          state.relations = action.payload;
        })
        .addCase(listRelation.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.error.message;
        })

    },
  });
  
  export default relationSlice.reducer;
  


