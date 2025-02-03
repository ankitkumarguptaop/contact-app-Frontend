import React from "react";
import { TextField } from "@mui/material";
import "../../pages/signup/signup.css";

const CustomInput = ({ errorState, handlerState, className, label, value }) => {
  return (
    <TextField
      error={errorState}
      value={value}
      className={className}
      id="outlined-required"
      label={label}
      size="small"
      sx={{
        input: {
          height: "25px",
          borderRadius: "6px",
          color: "black",
        },
        color: "black",
      }}
      onChange={handlerState}
    />
  );
};

export default CustomInput;
