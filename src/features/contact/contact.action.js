import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  LIST_CONTACT,
  LIST_DELETED_CONTACT,
  UPDATE_CONTACT,
   CREATE_CONTACT,
  RECOVER_CONTACT,
  DELETE_CONTACT
} from "./contact.type";

import {
  listContactService,
  updateContactService,
  deleteContactService,
  createContactService,
  recoverContactService,
  listDeletedContactService,
} from "../../services/contact.service";

export const listContact = createAsyncThunk(
  LIST_CONTACT,
  async (payload) => {
    try {
      const res = await listContactService(payload);
      const data = res.data;
      return data;
    } catch (error) {
      console.log({ errorMessage: error });
    }
  },
);

export const listDeletedContact = createAsyncThunk(
  LIST_DELETED_CONTACT,
  async (payload) => {
    try {
      const res = await listDeletedContactService(payload);
      const data = res.data;
      return data;
    } catch (error) {
      console.log({ errorMessage: error });
    }
  },
);

export const deleteContact = createAsyncThunk(
  DELETE_CONTACT,
  async (contact_id) => {
    const res = await deleteContactService(contact_id);
    const data = res.data;
    console.log("res data", data);
    return data;
  },
);

export const updateContact = createAsyncThunk(
  UPDATE_CONTACT,
  async (payload) => {
    const res = await updateContactService(payload);
    const data = res.data;
    console.log("res data", data);
    return data;
  },
);

export const recoverContacts = createAsyncThunk(
  RECOVER_CONTACT,
  async (payload) => {
    const res = await recoverContactService(payload);
    const data = res.data;
    console.log("res data", data);
    return data;
  },
);

export const createContact = createAsyncThunk(
  CREATE_CONTACT,
  async (contactData) => {
    const res = await createContactService(contactData);
    const data = res.data;
    console.log("res data", data);
    return data;
  },
);
