import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import About from "./About";
import Feature from "./Feature";
import Contact from "./Contact";
const images = [
  "CoverImages/image2.jpg",
  "CoverImages/image3.jpg",
  "CoverImages/image5.jpg",
  // Add more image paths as needed
];

export default function Homepage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const scrollToSection = (section) => {
    // Scroll to the specified section using smooth behavior
    document.getElementById(section).scrollIntoView({
      behavior: "smooth",
    });
  };
  useEffect(() => {
    // Change the image every 5 seconds
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  const currentImage = images[currentImageIndex];

  return (
    <>
      <div id="home">
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
            sx={{ background: "#1f3f66" }}
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
              <Button
                onClick={() => scrollToSection("home")}
                color="inherit"
                sx={{
                  color: "white",
                  marginRight: "25px",
                  "&:hover": { color: "#808080" },
                }}
              >
                Home
              </Button>
              <Button
                onClick={() => scrollToSection("about")}
                color="inherit"
                sx={{
                  color: "white",
                  marginRight: "25px",
                  "&:hover": { color: "#808080"},
                }}
              >
                About
              </Button>
              <Button
                onClick={() => scrollToSection("feature")}
                color="inherit"
                sx={{
                  color: "white",
                  marginRight: "25px",
                  "&:hover": { color: "#808080"},
                }}
              >
                Feature
              </Button>
              <Button
                onClick={() => scrollToSection("contact")}
                color="inherit"
                sx={{
                  color: "white",
                  marginRight: "25px",
                  "&:hover": { color: "#808080"},
                }}
              >
                Contact
              </Button>
              <Box sx={{ minWidth: "190px" }} />{" "}
              {/* Add a big space between buttons */}
              <Link to="/user/login">
                <Button
                  color="inherit"
                  sx={{
                    color: "white",
                    marginRight: "10px",
                    "&:hover": { backgroundColor: "#808080" },
                  }}
                >
                  Log in
                </Button>
              </Link>
              <Link to="/user/signup">
                <Button
                  color="inherit"
                  sx={{
                    color: "white",
                    "&:hover": { backgroundColor: "#808080" },
                  }}
                >
                  Sign up
                </Button>
              </Link>
            </Toolbar>
          </AppBar>
          <Box
            sx={{
              flex: 1,
              textAlign: "center",
              marginTop: "100px",
              display: "flex",
              alignItems:"center",
              justifyContent: "space-between",
            }}
          >
            <div style={{   margin:"10px" }}>
              <Typography
                variant="h1"
                sx={{
                  textAlign: "center",
                  fontFamily: "ADVERTISEMENT",
                  color:  "#808080",
                  marginRight :"0",
                  marginLeft:"0px",
                  marginBottom: "0px",
                  display:"block",
                  // fontSize:"80px",
                }}
              >
              Start 

              New Experience in Your Own World!
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
      </div>
      <div id="about" style={{ marginBottom: "25px", marginTop: "60px" }}>
        {/* Add margin-bottom to create space between the sections */}
        <About />
      </div>
      <div id="feature" style={{ marginBottom: "25px" }}>
        {/* Add margin-bottom to create space between the sections */}
        <Feature />
      </div>
      <div id="contact" style={{ marginBottom: "25px" }}>
        {/* Add margin-bottom to create space between the sections */}
        <Contact />
      </div>
    </>
  );
}
