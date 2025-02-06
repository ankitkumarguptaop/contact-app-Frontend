import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  listContactType,
  deleteContactType,
  updateContactType,
  createContactType,
  recoverContactType
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
    
    const {user_id, search, page, limit ,relation ,favourite} = payload;
    
    try {
      const res = await axios.get(
        listContactService(user_id, search, page, limit ,relation ,favourite)
      );
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
    const res = await axios.delete(deleteContactService(contact_id));
    const data = res.data;
    console.log("res data", data);
    return data;
  }
);

export const updateContact = createAsyncThunk(
  updateContactType,
  async (payload) => {
    const { contact_id, updatedData} =payload
    const res = await axios.patch(
      updateContactService(contact_id),
      updatedData
    );
    const data = res.data;
    console.log("res data", data);
    return data;
  }
);

export const recoverContacts = createAsyncThunk(
  recoverContactType,
  async () => {
    const res = await axios.put(
      recoverContactService()
    );
    const data = res.data;
    console.log("res data", data);
    return data;
  }
);


export const createContact = createAsyncThunk(
  createContactType,
  async (contactData) => {
    const res = await axios.post(createContactService(), contactData);
    const data = res.data;
    console.log("res data", data);
    return data;
  }
);
