import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  listContactType,
  deleteContactType,
  updateContactType,
  createContactType,
  recoverContactType,
} from "./contact.type";

import {
  listContactService,
  updateContactService,
  deleteContactService,
  createContactService,
  recoverContactService,
} from "../../services/contact.service";

export const listContact = createAsyncThunk(
  listContactType,
  async (payload) => {
    try {
      const res = await listContactService(payload);
      const data = res.data;
      console.log("res data", data);
      return data;
    } catch (error) {
      console.log({ errorMessage: error });
    }
  }
);

export const deleteContact = createAsyncThunk(
  deleteContactType,
  async (contact_id) => {
    const res = await deleteContactService(contact_id);
    const data = res.data;
    console.log("res data", data);
    return data;
  }
);

export const updateContact = createAsyncThunk(
  updateContactType,
  async (payload) => {
    const res = await updateContactService(payload)
    const data = res.data;
    console.log("res data", data);
    return data;
  }
);

export const recoverContacts = createAsyncThunk(
  recoverContactType,
  async () => {
    const res = await recoverContactService()
    const data = res.data;
    console.log("res data", data);
    return data;
  }
);

export const createContact = createAsyncThunk(
  createContactType,
  async (contactData) => {
    const res = await createContactService(contactData)
    const data = res.data;
    console.log("res data", data);
    return data;
  }
);
