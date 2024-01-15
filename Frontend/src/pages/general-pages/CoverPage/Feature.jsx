import React from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CampaignTwoToneIcon from '@mui/icons-material/CampaignTwoTone';
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
import InsertPhotoTwoToneIcon from '@mui/icons-material/InsertPhotoTwoTone';

const Feature = () => {
  return (
    <div style={{display:"block",marginTop:"2%" }}>
    <Typography variant="h3" component="div" sx={{ color: "grey", fontFamily: "Brush Script MT", marginLeft:"80px",marginBottom:"0"}}>
        Features CSED
      </Typography>
      <div style={{ display: "flex", justifyContent: "space-around", marginTop:"150px"}}>
        {/* Card 1 */}
        <Card sx={{ width: "290px"}}>
          <CardMedia
            component={CampaignTwoToneIcon}
            style={{  marginLeft:"35%" ,fontSize: 80, display: "flex", justifyContent: "center", alignItems: "center", height: "auto" }}
          />
          <CardContent>
            <Typography variant="h5" align="center"fontFamily="Comic Sans MS" color="grey">
              Announcements
            </Typography>
            <Typography variant="h6" align="center"fontFamily="Corbel"  marginTop={1}>
            Allows the lecturers of the department to disseminate crucial announcements and updates efficiently.
            </Typography>
          </CardContent>
        </Card>
        {/* Card 2 */}
        <Card sx={{ width: "290px" }}>
          <CardMedia
            component={CalendarMonthTwoToneIcon}
            style={{marginLeft:"35%", fontSize: 80, display: "flex", justifyContent: "center", alignItems: "center", height: "auto" }}
          />
          <CardContent>
            <Typography variant="h5" align="center" fontFamily="Comic Sans MS" color="grey">
              Booking Appointments
            </Typography>
            <Typography variant="h6" align="center"fontFamily="Corbel"  marginTop={1}>
            Allow the students to meet with academics. with academics managing their availability and students easily scheduling appointmentsbooking system.
            </Typography>
          </CardContent>
        </Card>
        {/* Card 3 */}
        <Card sx={{ width: "290px" }}>
          <CardMedia
            component={InsertPhotoTwoToneIcon}
            style={{ marginLeft:"35%" ,fontSize: 80, display: "flex", justifyContent: "center", alignItems: "center", height: "auto"}}
          />
          <CardContent>
            <Typography variant="h5" align="center" fontFamily="Comic Sans MS" color="grey">
              Gallery
            </Typography>
            <Typography variant="h6" align="center"fontFamily="Corbel" marginTop={1}>
            Photo gallery that houses a visual record of the department's activities and accomplishments.
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Feature;
