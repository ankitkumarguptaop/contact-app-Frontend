
import axios from "axios";

export const signupUserService = async( signupData) => {
  return await axios.post(`${process.env.REACT_APP_BACKEND_URL}auth/signup`, signupData);
};

export const signinUserService =async (signinData) => {
  return await axios.post(`${process.env.REACT_APP_BACKEND_URL}auth/signin`,signinData);
};


export const googleAuthUserService = (googleAuthData) => {
  return axios.post(`${process.env.REACT_APP_BACKEND_URL}auth/google` ,googleAuthData);
};