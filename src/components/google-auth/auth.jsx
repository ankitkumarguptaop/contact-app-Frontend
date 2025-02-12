import { Button } from "@mui/material";
import React from "react";
import Google from "../../assets/images/google.png";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { googleAuth } from "../../features/auth-user/auth.action";
const Auth = ({ image }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handleGoogleAuthentication() {
    try{
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
      if (result.user) {
        toast.success("User successfuly signup!", {
          position: "top-center",
        });
        dispatch(
          googleAuth({
            email: result.user.email,
            first_name: result.user.displayName,
            picture: result.user.photoURL,
          }),
        );
        navigate("/home");
      }
    });
  }
  catch(error){
    toast.error("Failed  signup!", {
      position: "top-center",
    });
 
  }
  }
  return (
    <>
      <Button
        sx={{ backgroundColor: "transparent", marginTop: "5px" }}
        onClick={handleGoogleAuthentication}
      >
        <img style={{ height: "50px", width: "370px" }} src={Google} alt="" />
      </Button>
      <ToastContainer></ToastContainer>
    </>
  );
};

export default Auth;
