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
      <Card sx={{ padding: "22px", margin: "50px", border:"1px solid #1f3f66" }}>
        <CardContent  >
        <Typography
        variant="h3"
        component="div"
        sx={{
          color: "#1f3f66",
          marginBottom: 2,
          fontFamily: "Brush Script MT",
          margin: "20px 10px",
        }}
      >
        Contact CSED
      </Typography>
          <div style={{ display: "flex", alignItems: "center",paddingTop: "13px", }}>
            <Avatar sx={{ m: 2, bgcolor: "#1f3f66" }}>
              <PhoneIcon />
            </Avatar>
            <Typography component="h1" variant="h7" sx={{ fontSize: "1.5rem" }}>
              +970 9 2688199
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              paddingTop: "13px",
            }}
          >
            <Avatar sx={{ m: 2, bgcolor: "#1f3f66" }}>
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
