import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { listUser, updateUser, deleteUser } from "./user.type";

import {
  listUserService,
  deleteUserService,
  updateUserService,
  getUserService,
} from "../../services/user.service";
// this is action / action creator

export const listUser = createAsyncThunk(listUser, async () => {
  try {
    const res = await axios.get(listUserService());
    const data = res.data;
    console.log("res data", data);
    return data;
  } catch (error) {
    return {
      message: error.message,
    };
  }
});

export const getUser = createAsyncThunk(listUser, async (user_id) => {
  try {
    const res = await axios.get(getUserService(user_id));
    const data = res.data;
    console.log("res data", data);
    return data;
  } catch (error) {}
});

export const deleteUser = createAsyncThunk(deleteUser, async (contact_id) => {
  const res = await axios.delete(deleteUserService(contact_id));
  const data = res.data;
  console.log("res data", data);
  return data;
});

export const updateUser = createAsyncThunk(
  updateUser,
  async (contact_id, updatedData) => {
    const res = await axios.patch(updateUserService(contact_id), updatedData);
    const data = res.data;
    console.log("res data", data);
    return data;
  },
);
