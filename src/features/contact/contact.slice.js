import { createSlice } from "@reduxjs/toolkit";
import {
  listContact,
  deleteContact,
  updateContact,
  createContact,
  recoverContacts,
} from "./contact.action";

const initialState = {
  contacts: [],
  page: 0,
  totalContacts: 0,
  isLoading: false,
  error: null,
};

export const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(listContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = action.payload.contacts;
        state.page = action.payload.page;
        state.totalContacts = action.payload.totalContacts;
      })
      .addCase(listContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.contacts = state.contacts.filter((contact)=> contact._id!==action.payload.contact._id)
        // console.log(state.contacts ,"jnk",action.payload.contact._id)
        state.totalContacts = parseInt(state.totalContacts) - 1;
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.contacts.findIndex(
          (contact) => contact._id === action.payload._id
        );
        state.contacts.splice(index, 1, action.payload);
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(createContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createContact.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("paopa", action.payload);
        state.contacts = [...state.contacts, action.payload];
        state.totalContacts = parseInt(state.totalContacts) + 1;
      })
      .addCase(createContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(recoverContacts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(recoverContacts.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(recoverContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default contactSlice.reducer;
