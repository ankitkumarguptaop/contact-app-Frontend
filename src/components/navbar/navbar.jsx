import React, { useEffect, useState } from "react";
import { Avatar, Box, Button, Typography } from "@mui/material";
import "./navbar.css";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth-user/auth.slice";
import { useNavigate } from "react-router-dom";
import {
  listDeletedContact,
} from "../../features/contact/contact.action";

const Navbar = ({ setPage, page, openRecoverModal, setOpenRecoverModal }) => {
  const totalContacts = useSelector((state) => state.contact.totalContacts);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [pictureUrl, setPictureUrl] = useState("");

  useEffect(() => {
    if (currentUser.user.picture.startsWith("http")) {
      setPictureUrl(currentUser.user.picture);
    } else {
      setPictureUrl(
        `${process.env.REACT_APP_BACKEND_URL}${currentUser.user.picture}`,
      );
    }
  }, [currentUser.user.picture, currentUser]);

  useEffect(() => {
    dispatch(listDeletedContact({ userId: currentUser.user._id }));
  }, [totalContacts]);

  function handleLogout() {
    dispatch(logout());
    navigate("/");
  }

  function hanldeOpenRecoverModal() {
    setOpenRecoverModal(true);
  }

  return (
    <Box className="navbar">
      <Box className="left-items">
        <MenuIcon sx={{ color: "white", margin: "10px" }}></MenuIcon>
        <Typography
          className="contact-management-text"
          variant="subtitle1"
          component="h2"
          sx={{ color: "white", margin: "10px" }}
        >
          Contact Management
        </Typography>
      </Box>
      <Box className="right-items">
        <Avatar alt="Remy Sharp" src={pictureUrl} />
        <Typography
          className="display-name"
          variant="subtitle1"
          component="h2"
          sx={{ color: "white" }}
        >
          {currentUser.user.first_name} {currentUser.user.last_name}
        </Typography>
        <Button
          sx={{ color: "black", backgroundColor: "green", margin: "10px" }}
          onClick={hanldeOpenRecoverModal}
        >
          Recover
        </Button>
        <Button
          className="Logout-button"
          sx={{ color: "black", backgroundColor: "red" }}
          onClick={handleLogout}
        >
          Log Out
        </Button>
      </Box>
    </Box>
  );
};

export default Navbar;
