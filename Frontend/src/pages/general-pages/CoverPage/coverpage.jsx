import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const images = [
  "CoverImages/image1.jpg",
  "CoverImages/image2.jpg",
  "CoverImages/image3.jpg",
  "CoverImages/image5.jpg",

  // Add more image paths as needed
];

export default function Coverpage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Change the image every 5 seconds
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  const currentImage = images[currentImageIndex];

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
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
          <Link to="/login">
            <Button color="inherit" sx={{ color: "white" }}>
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button color="inherit" sx={{ color: "white" }}>
              Signup
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
      <Box sx={{ flex: 1, textAlign: "center", marginTop: "80px" }}>
        <img
          src={currentImage}
          alt="Slideshow"
          style={{
            width: "400px", // Adjust the width as needed
            height: "auto",
            display: "block",
            margin: "0 auto",
            // marginTop: "10px",
          }}
        />
        <Typography
          variant="h1"
          component="div"
          sx={{
            fontFamily: "Brush Script MT",
            color: "black",
            margin: "90px",
            marginTop: "0px",
            marginBottom: "0px",
          }}
        >
          Welcome to the CSED Community
        </Typography>
      </Box>
    </Box>
  );
}
