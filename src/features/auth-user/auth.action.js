import { createAsyncThunk } from "@reduxjs/toolkit";
import {googleAuthUserService, signinUserService ,signupUserService} from "../../services/auth.service"
import {signin ,signup ,googleAuthentication} from "./auth.type"
import axios from "axios";

export const signUpUser = createAsyncThunk(
    signup,
  async (signupData) => {
    const res = await axios.post(
        signupUserService(),
      signupData
    );
    const data = res.data;
    console.log("res data", data);
    return data;
  }
);

export const signInUser = createAsyncThunk(
    signin,
  async (signinData) => {
    const res = await axios.post(
        signinUserService(),
      signinData
    );
    const data = res.data;
    console.log("res data", data);
    return res;
  }
);


export const googleAuth = createAsyncThunk(
  googleAuthentication,
async (googleAuthData) => {
  const res = await axios.post(
      googleAuthUserService(),
      googleAuthData
  );
  const data = res.data;
  console.log("res data", data);
  return data;
}
);