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
         
          height: "22px",
          borderRadius: "6px",
          color: "black",
          margin:"0px"
        },
        color: "black",
         margin:"0px",
         minWidth:"150px",
      }}
      onChange={handlerState}
    />
  );
};

export default CustomInput;
