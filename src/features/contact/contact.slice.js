import { createSlice } from "@reduxjs/toolkit";
import {
  deleteContact,
  updateContact,
  createContact,
  recoverContacts,
  listContact,
} from "./contact.action";

const initialState = {
  contacts: [],
  allContacts: [],
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
        state.page = action.payload.page;
        if (state.page !== 0) {
          state.contacts = [...state.contacts, ...action.payload.contacts];
        } else {
          state.contacts = [...action.payload.contacts];
        }
        state.totalContacts = action.payload.totalContacts;
        console.log("totalContacts", state.totalContacts);
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
        state.contacts = state.contacts.filter(
          (contact) => contact._id !== action.payload.contact._id,
        );
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
          (contact) => contact._id === action.payload._id,
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
        console.log(action.payload, "-->");
        state.totalContacts =
          parseInt(state.totalContacts) + parseInt(action.payload.length);
        state.isLoading = false;
      })
      .addCase(recoverContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { addContacts } = contactSlice.actions;

export default contactSlice.reducer;
