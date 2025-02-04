import React from "react";
import { Box, Button, Typography } from "@mui/material";
import "./navbar.css";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector ,useDispatch } from "react-redux";
import { logout } from "../../features/auth-user/auth.slice";
import { useNavigate } from "react-router-dom";
import { listContact, recoverContacts } from "../../features/contact/contact.action";

const Navbar = () => {
  const navigate =useNavigate()
  const dispatch =useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  console.log(currentUser.data.user.first_name);
  console.log(currentUser.data.user.last_name);
  console.log( " user" ,currentUser);


  function handleLogout(){
    dispatch(logout());
    navigate("/");
  }

  function handleRecoverContact(){
    dispatch(recoverContacts())
    dispatch(listContact({user_id:currentUser.data.user._id}))
  }

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
        <Button sx={{color:"black" ,backgroundColor:"green", margin:"10px"}} onClick={handleRecoverContact}>Recover</Button>
      <Button sx={{color:"black" ,backgroundColor:"red", margin:"10px"}} onClick={handleLogout}>Log Out</Button>
      </Box>
    </Box>
  );
};

export default Navbar;
