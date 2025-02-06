import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  googleAuthUserService,
  signinUserService,
  signupUserService,
} from "../../services/auth.service";
import { signin, signup, googleAuthentication } from "./auth.type";

export const signUpUser = createAsyncThunk(signup, async (signupData) => {
  const res = await signupUserService(signInUser);
  const data = res.data;
  console.log("res data", data);
  return data;
});

export const signInUser = createAsyncThunk(signin, async (signinData) => {
  const res = await signinUserService(signinData);
  const data = res.data;
  console.log("res data", data);
  return res;
});

export const googleAuth = createAsyncThunk(
  googleAuthentication,
  async (googleAuthData) => {
    const res = await googleAuthUserService(googleAuthData);
    const data = res.data;
    console.log("res data", data);
    return data;
  },
);
