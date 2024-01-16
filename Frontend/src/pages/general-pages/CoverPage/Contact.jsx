import React from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Avatar } from "@mui/material";

const Contact = () => {
  return (
    <div>
      <Typography
        variant="h3"
        component="div"
        sx={{
          color: "Highlight",
          marginBottom: 2,
          fontFamily: "Brush Script MT",
          margin: "50px 80px",
        }}
      >
        Contact CSED
      </Typography>
      <Card fullwidth="true"
      sx={{ padding:"50px 20px", margin: "50px" }}>
        <CardContent>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar sx={{ m: 1, bgcolor: "Highlight" }}>
              <PhoneIcon />
            </Avatar>
            <Typography component="h1" variant="h7" sx={{ fontSize: "1.5rem" }}>
              +970 9 2688199
            </Typography>
          </div>
          <div style={{ display: "flex", alignItems: "center" , paddingTop:"20px"}}>
            <Avatar sx={{ m: 1, bgcolor: "Highlight" }}>
              <EmailIcon />
            </Avatar>
            <Typography component="h1" variant="h7" sx={{ fontSize: "1.5rem" }}>
              thaer.sammar@ptuk.edu.ps
            </Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Contact;
