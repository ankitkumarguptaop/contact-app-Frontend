import React from "react";
import { Alert, Box, Button, Checkbox, Snackbar } from "@mui/material";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import CustomInput from "../../components/input/input";
import Cookies from "js-cookie";
import "./signin.css";
import { useDispatch, useSelector } from "react-redux";
import { removeError } from "../../features/auth-user/auth.slice";
import { signInUser } from "../../features/auth-user/auth.action";
import Auth from "../../components/google-auth/auth";
const Signin = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const signinError = useSelector((state) => state.auth.error);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [checked, setChecked] = useState(false);
  const [checkboxError, setCheckboxError] = useState(false);
  console.log("currentUser", currentUser);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    emailError: false,
    passwordError: false,
  });

  function handleEmail(e) {
    setInput({
      email: e.target.value,
      password: input.password,
    });
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(e.target.value)) {
      setError({
        emailError: true,
        passwordError: error.passwordError,
      });
    } else {
      setError({
        emailError: false,
        passwordError: error.passwordError,
      });
    }
    if (e.target.value.length <= 0) {
      setError({
        emailError: false,
        passwordError: error.passwordError,
      });
    }
  }

  function handlePassword(e) {
    setInput({
      email: input.email,
      password: e.target.value,
    });
    var passwordPattern =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    if (!passwordPattern.test(e.target.value)) {
      setError({
        emailError: error.emailError,
        passwordError: true,
        firstNameError: error.firstNameError,
        lastNameError: error.lastNameError,
      });
    } else {
      setError({
        emailError: error.emailError,
        passwordError: false,
        firstNameError: error.firstNameError,
        lastNameError: error.lastNameError,
      });
    }
    if (e.target.value.length <= 0) {
      setError({
        emailError: error.emailError,
        passwordError: false,
      });
    }
  }

  async function handleSignUp(e) {
    e.preventDefault();
    if (!checked) {
      setCheckboxError(true);
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,16}$/;
    let currentEmailError = false;
    let currentPasswordError = false;
    if (!emailPattern.test(input.email)) {
      currentEmailError = true;
      console.log(error);
    }

    if (!passwordPattern.test(input.password)) {
      currentPasswordError = true;
    }
    setError({
      emailError: currentEmailError,
      passwordError: currentPasswordError,
    });
    if (input.email && input.password) {
      try {
        const data = {
          password: input.password,
          email: input.email,
        };

        dispatch(signInUser(data));

         const token = currentUser.token;
        // console.log("token", token);
        Cookies.set("jwt", token , { expires: 7, secure: true });
        setInput({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        });
        navigate("/home");
      } catch (error) {
        console.log(error);
      }
    }
  }

  function handleCheckbox() {
    setChecked(() => !checked);
    if (!checked) {
      setCheckboxError(false);
    }
  }

  function handelClose() {
    dispatch(removeError());
  }

  return (
    <>
      <Box className="container">
        <Box className="signin-container">
          <Box className="signin-functionality">
            <Snackbar
              open={signinError}
              autoHideDuration={2000}
              onClose={handelClose}
            >
              <Alert
                onClose={handelClose}
                severity="error"
                variant="filled"
                sx={{ width: "100%" }}
              >
                Unable to signin
              </Alert>
            </Snackbar>
            <Box className="login-text">Sign In</Box>
            <Box className="upper-text">Welcome Back</Box>
            <Box className="form">
              <form action="">
                <Box className="input">
                  <CustomInput
                    value={input.email}
                    errorState={error.emailError}
                    className="input-email"
                    handlerState={handleEmail}
                    label="Email"
                  ></CustomInput>
                </Box>
                {error.emailError && (
                  <Box
                    style={{
                      color: "red",
                      marginTop: "-14px",
                      marginBottom: "10px",
                    }}
                  >
                    Enter correct email
                  </Box>
                )}

                <Box className="input">
                  <CustomInput
                    value={input.password}
                    errorState={error.passwordError}
                    className="input-password"
                    handlerState={handlePassword}
                    label="Password"
                  ></CustomInput>
                </Box>
                {error.passwordError && (
                  <Box
                    style={{
                      color: "red",
                      marginTop: "-14px",
                      marginBottom: "10px",
                    }}
                  >
                    Enter correct password
                  </Box>
                )}

                <Box className="feature-container">
                  <Box className="check-box">
                    <Checkbox
                      onClick={handleCheckbox}
                      checked={checked}
                      sx={{
                        color: "rgb(40, 40, 154)",
                        "&.Mui-checked": {
                          color: "rgb(40, 40, 154)",
                        },
                      }}
                      {...label}
                    />
                    I agree to the terms and privacy policy
                    {checkboxError && (
                      <Box
                        className="tic-checkbox"
                        style={{
                          color: "red",
                          marginTop: "-14px",
                          marginBottom: "10px",
                        }}
                      >
                        Please tick checkbox
                      </Box>
                    )}
                  </Box>
                </Box>
                <Button
                  onClick={handleSignUp}
                  // diableripple
                  disableElevation
                  sx={{
                    bgcolor: "#7754f6",
                    color: "#FFFFFF",
                    width: "25vw",
                    height: "45px",
                    marginTop: "-5px",
                    borderRadius: "5px",
                    textTransform: "none",
                    boxShadow:
                      "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                  }}
                  className="sinup-button"
                >
                  Log In
                </Button>
              </form>
              <Box className="signin-link">
                <Box component={"span"}>
                  Dont have an account? <Link to="/signup">Signup</Link>{" "}
                </Box>
              </Box>
            </Box>
       <Auth></Auth>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Signin;
