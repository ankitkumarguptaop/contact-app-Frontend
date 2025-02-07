import { Alert, Box, Button, Checkbox, Snackbar } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../../components/input/input";
import "./signup.css";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "../../features/auth-user/auth.action";
import { removeError } from "../../features/auth-user/auth.slice";
import "./signup.css";
import Auth from "../../components/google-auth/auth";

const Signup = () => {
  const navigate = useNavigate();
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [checked, setChecked] = useState(false);
  const [checkboxError, setCheckboxError] = useState(false);

  const dispatch = useDispatch();
  const signUpError = useSelector((state) => state.auth.error);
  const [picture, setPicture] = useState("");

  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    firstNameError: false,
    emailError: false,
    passwordError: false,
    lastNameError: false,
  });

  function handleFirstName(e) {
    setInput({
      email: input.email,
      firstName: e.target.value,
      password: input.password,
      lastName: input.lastName,
    });
    if (e.target.value.replace(/\s+/g, " ").trim().length <= 0) {
      setError({
        emailError: error.emailError,
        passwordError: error.passwordError,
        lastNameError: error.lastNameError,
        firstNameError: true,
      });
    } else {
      setError({
        emailError: error.emailError,
        passwordError: error.passwordError,
        lastNameError: error.lastNameError,

        firstNameError: false,
      });
    }
    if (e.target.value.length <= 0) {
      setError({
        emailError: error.emailError,
        passwordError: error.passwordError,
        lastNameError: error.lastNameError,

        firstNameError: false,
      });
    }
  }

  function handleLastName(e) {
    setInput({
      email: input.email,
      firstName: input.firstName,
      password: input.password,
      lastName: e.target.value,
    });
    if (e.target.value.replace(/\s+/g, " ").trim().length <= 0) {
      setError({
        emailError: error.emailError,
        passwordError: error.passwordError,
        firstNameError: error.firstNameError,
        lastNameError: true,
      });
    } else {
      setError({
        emailError: error.emailError,
        passwordError: error.passwordError,
        firstNameError: error.firstNameError,
        lastNameError: false,
      });
    }
    if (e.target.value.length <= 0) {
      setError({
        emailError: error.emailError,
        passwordError: error.passwordError,
        firstNameError: error.firstNameError,
        lastNameError: false,
      });
    }
  }

  function handleEmail(e) {
    setInput({
      email: e.target.value,
      firstName: input.firstName,
      password: input.password,
      lastName: input.lastName,
    });
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(e.target.value)) {
      setError({
        emailError: true,
        passwordError: error.passwordError,
        firstNameError: error.firstNameError,
        lastNameError: error.lastNameError,
      });
    } else {
      setError({
        emailError: false,
        passwordError: error.passwordError,
        firstNameError: error.firstNameError,
        lastNameError: error.lastNameError,
      });
    }
    if (e.target.value.length <= 0) {
      setError({
        emailError: false,
        passwordError: error.passwordError,
        firstNameError: error.firstNameError,
        lastNameError: error.lastNameError,
      });
    }
  }

  function handlePassword(e) {
    setInput({
      email: input.email,
      firstName: input.firstName,
      password: e.target.value,
      lastName: input.lastName,
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
        firstNameError: error.firstNameError,
        lastNameError: error.lastNameError,
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
    let currentFirstNameError = false;
    let currentLastNameError = false;
    if (!emailPattern.test(input.email)) {
      currentEmailError = true;
      console.log(error);
    }
    if (
      input.firstName.replace(/\s+/g, " ").trim().length <= 0 ||
      input.firstName <= 0
    ) {
      currentFirstNameError = true;
    }
    if (
      input.lastName.replace(/\s+/g, " ").trim().length <= 0 ||
      input.lastName <= 0
    ) {
      currentLastNameError = true;
    }
    if (!passwordPattern.test(input.password)) {
      currentPasswordError = true;
    }
    setError({
      emailError: currentEmailError,
      passwordError: currentPasswordError,
      firstNameError: currentFirstNameError,
      lastNameError: currentLastNameError,
    });

    if (
      !currentEmailError &&
      !currentPasswordError &&
      !currentLastNameError &&
      !currentPasswordError
    ) {
      try {
        const formdata = new FormData();
        formdata.append("picture", picture);
        formdata.append("first_name", input.firstName);
        formdata.append("last_name", input.lastName);
        formdata.append("password", input.password);
        formdata.append("email", input.email);
        dispatch(signUpUser(formdata));
        setInput({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        });
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  }

  function handleCheckbox() {
    setChecked(!checked);
    if (!checked) {
      setCheckboxError(false);
    }
  }
  function handelClose() {
    dispatch(removeError());
  }

  return (
    <Box className="container">
      <Snackbar
        open={signUpError}
        autoHideDuration={2000}
        onClose={handelClose}
      >
        <Alert
          onClose={handelClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Unable to signup
        </Alert>
      </Snackbar>
      <Box className="signup-container">
        <Box className="sigup-functionality">
          <Box className="login-text">Sign Up</Box>
          <Box className="upper-text">Create your account in a seconds</Box>
          <Box className="form">
            <form action="">
              <Box className="input">
                <CustomInput
                  value={input.firstName}
                  errorState={error.firstNameError}
                  handlerState={handleFirstName}
                  label="First Name"
                ></CustomInput>
                {error.firstNameError && (
                  <Box
                    style={{
                      color: "red",
                      marginTop: "-4px",
                      marginBottom: "10px",
                    }}
                  >
                    Enter correct firstname
                  </Box>
                )}
              </Box>
              <Box className="input">
                <CustomInput
                  value={input.lastName}
                  errorState={error.lastNameError}
                  handlerState={handleLastName}
                  label="Last Name"
                ></CustomInput>
                {error.lastNameError && (
                  <Box
                    style={{
                      color: "red",
                      marginBottom: "10px",
                    }}
                  >
                    Enter correct lastname
                  </Box>
                )}
              </Box>
              <Box className="input">
                <CustomInput
                  value={input.email}
                  errorState={error.emailError}
                  handlerState={handleEmail}
                  label="Email "
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
              <Box className="upload-picture">
                <input
                  type="file"
                  name="picture"
                  onChange={(e) => setPicture(e.target.files[0])}
                />
              </Box>
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
                disableElevation
                type="submit"
                sx={{
                  bgcolor: "#7754f6",
                  color: "#FFFFFF",
                  minWidth: "400px",
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
                Create an account
              </Button>
            </form>
            <Box className="signin-link">
              <Box component={"span"}>
                Alredy a member? <Link to="/">Login</Link>{" "}
              </Box>
            </Box>
          </Box>
          <Auth></Auth>
        </Box>
      </Box>
    </Box>
  );
};

export default Signup;
