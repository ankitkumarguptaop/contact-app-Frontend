import React from "react";
import { Box, Typography } from "@mui/material";
import "./navbar.css";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector } from "react-redux";
const Navbar = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  console.log(currentUser.data.user.first_name);
  console.log(currentUser.data.user.last_name);
  return (
    <Box className="navbar">
      <Box className="left-items">
        <MenuIcon sx={{ color: "white", margin: "10px" }}></MenuIcon>
        <Typography
          variant="subtitle1"
          component="h2"
          sx={{ color: "white", margin: "10px" }}
        >
          Contact Management
        </Typography>
      </Box>
      <Box className="right-items">
        <Typography variant="subtitle1" component="h2" sx={{ color: "white" }}>
          {currentUser.data.user.first_name} {currentUser.data.user.last_name}
        </Typography>
      </Box>
    </Box>
  );
};

export default Navbar;
