// AnnouncementDisplayPage.js

import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";

const AnnouncementDisplayPage = ({ announcementData }) => {
  // Check if announcementData is defined
  if (!announcementData) {
    return <div>Loading...</div>; // or any other appropriate handling
  }

  const { title, announcementText, documentFiles, photoFiles, lecturerUsers } =
    announcementData;

  return (
    <div>
      <AppBar
        position="static"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
        }}
        sx={{ background: "black" }}
      >
        <Toolbar>
          <Typography
            variant="h5"
            component="div"
            sx={{
              flexGrow: 1,
              fontFamily: "Brush Script MT",
            }}
          >
            CSED
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          width: 600,
          maxWidth: "100%",
          border: "1px solid #ddd",
          padding: "50px",
          borderRadius: "20px",
          marginTop: "80px",
          marginLeft: "270px",
          marginRight: "100px",
        }}
      >
        <Card>
          <CardHeader
            title={title}
            subheader={`Posted by ${lecturerUsers.join(", ")}`}
          />
          <CardContent>
            <Typography variant="body1" color="textSecondary" component="div">
              <p>{announcementText}</p>
            </Typography>

            {documentFiles.length > 0 && (
              <div>
                <Typography variant="h6" gutterBottom>
                  Attached Documents
                </Typography>
                {documentFiles.map((file, index) => (
                  <div key={index}>{file.name}</div>
                ))}
              </div>
            )}

            {photoFiles.length > 0 && (
              <div>
                <Typography variant="h6" gutterBottom>
                  Attached Photos
                </Typography>
                {photoFiles.map((file, index) => (
                  <div key={index}>
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Photo ${index + 1}`}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "200px",
                        marginTop: "10px",
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Button
          onClick={() => window.history.back()} // Go back to the previous page
          style={{
            marginTop: "20px",
            background: "#e7e4e4",
          }}
        >
          Go Back
        </Button>
      </Box>
    </div>
  );
};

export default AnnouncementDisplayPage;
