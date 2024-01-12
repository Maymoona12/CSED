import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const images = [
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
          <Link to="/">
            <Button
              color="inherit"
              sx={{
                color: "white",
                marginRight: "25px",
                "&:hover": { color: "lightblue" },
              }}
            >
              Home
            </Button>
          </Link>
          <Link to="/about">
            <Button
              color="inherit"
              sx={{
                color: "white",
                marginRight: "25px",
                "&:hover": { color: "lightblue" },
              }}
            >
              About
            </Button>
          </Link>
          <Link to="/feature">
            <Button
              color="inherit"
              sx={{
                color: "white",
                marginRight: "25px",
                "&:hover": { color: "lightblue", },
              }}
            >
              Feature
            </Button>
          </Link>
          <Link to="/contact">
            <Button
              color="inherit"
              sx={{
                color: "white",
                marginRight: "25px",
                "&:hover": { color: "Lightblue" },
              }}
            >
              Contact
            </Button>
          </Link>
          <Box sx={{ minWidth: "190px" }} /> {/* Add a big space between buttons */}
          <Link to="/login">
            <Button
              color="inherit"
              sx={{
                color: "white",
                marginRight: "10px",
                "&:hover": { backgroundColor: "lightblue" },
              }}
            >
              Log in
            </Button>
          </Link>
          <Link to="/signup">
            <Button
              color="inherit"
              sx={{
                color: "white",
                "&:hover": { backgroundColor: "lightblue" },
              }}
            >
              Sign up
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
      <Box sx={{ flex: 1, textAlign: "center", marginTop: "80px", display: "flex", justifyContent: "space-between" }}>
        <div style={{ flex: 1, textAlign: "center" }}>
          <Typography
            variant="h3"
            component="div"
            sx={{
              fontFamily: "Bradley Hand ITC",
              color: "black",
              margin: "85px",
              marginBottom: "0px",
            }}
          >
           “Coding, it's an endless process of trial and error, of trying to get the right command in the right place, with sometimes just a semicolon making the difference between success and failure."
          </Typography>
        </div>
        <div>
          <img
            src={currentImage}
            alt="Slideshow"
            style={{
              width: "500px", // Adjust the width as needed
              height: "auto",
              display: "block",
             
            }}
          />
        </div>
      </Box>
    </Box>
  );
}
