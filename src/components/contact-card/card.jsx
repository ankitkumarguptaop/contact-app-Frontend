import {
  CardMedia,
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  Box,
} from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";

import React from "react";
import "./card.css";

const ContactCard = ({ name, phone_no, favourite ,relation ,handleEdit,handleDelete}) => {
  return (
    <>
      <Box className="cart-container">
        <Card sx={{ width:"80vw", maxHeight: 200 }} elevation={3}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
             {name}
            </Typography>
            <Typography variant="body2" sx={{ color: "black" }}>
              Phone no : {phone_no}
            </Typography>
            <Box className="card-favourite">
            <Typography variant="body2" sx={{ color: "black" }}>
              Favourite  :   
            </Typography>
            {favourite ?   <StarBorderIcon
                                  sx={{ color: "yellow"  ,marginLeft:"10px" }}
                                ></StarBorderIcon> : <StarBorderIcon
                                sx={{ color: "blue", marginLeft:"10px"}}
                              ></StarBorderIcon>} 
              </Box>
            <Typography variant="body2" sx={{color: "black" }}>
              Relation : {relation}
            </Typography>
          </CardContent>
          <CardActions>
            <Button  onClick={handleEdit}variant="contained" size="small">
              Edit
            </Button>
            <Button onClick={handleDelete} variant="contained" size="small">
              Delete
            </Button>
          </CardActions>
        </Card>
      </Box>
    </>
  );
};

export default ContactCard;
