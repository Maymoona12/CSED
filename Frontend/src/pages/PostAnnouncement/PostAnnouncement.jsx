import React, { useState, useRef } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import InputAdornment from "@mui/material/InputAdornment";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import AddLinkIcon from "@mui/icons-material/AddLink";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";

const PostAnnouncementPage = () => {
  const [documentFile, setDocumentFile] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const documentInputRef = useRef(null);
  const photoInputRef = useRef(null);

  const handleDocumentChange = (e) => {
    const file = e.target.files[0];
    setDocumentFile(file);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhotoFile(file);
  };

  const handleFolderIconClick = (inputRef) => {
    inputRef.current.click();
  };

  const handleSubmit = () => {
    // Handle the submission logic here
    console.log("Document:", documentFile);
    console.log("Photo:", photoFile);
  };

  return (
    <div
      className="post-announcement-page"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* AppBar */}
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
      <div style={{ marginTop: "80px" }}>
        <Box
          sx={{
            width: 490,
            maxWidth: "100%",
            border: "1px solid #ddd", // Border styling
            padding: "10px", // Padding inside the box
            borderRadius: "20px", // Border radius for rounded corners
            marginLeft: "350px",
            marginRight: "100px",
          }}
        >
          <h2
            style={{
              color: "black",
              fontFamily: "	Monaco",
              marginBottom: "40px",
              marginLeft: "150px",
            }}
          >
            Post Announcement
          </h2>
          <Typography
            variant="h5"
            sx={{
              marginBottom: "5px",
              marginLeft: "8px",
              fontFamily: "Monaco",
              color: "black",
            }}
          >
            Title
          </Typography>

          {/* <TextField fullWidth label="Title" id="fullWidth" /> */}
          <TextField fullWidth id="fullWidth" />

          <Typography
            variant="h5"
            sx={{
              marginTop: "10px",
              marginLeft: "8px",
              fontFamily: "Monaco",
              color: "black",
            }}
          >
            Announcement
          </Typography>

          <div style={{ display: "flex", marginBottom: "20px" }}>
            <TextareaAutosize
              aria-label="Announcement"
              minRows={3}
              placeholder="Write your announcement here..."
              onChange={(e) => setAnnouncementText(e.target.value)}
              style={{
                width: "100%",
                marginTop: "8px",
                padding: "20px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
            <div
              style={{
                marginLeft: "50px",
                marginRight: "20px",
                marginTop: "30px",
              }}
            >
              <input
                type="file"
                id="documentInput"
                accept=".pdf,.doc,.docx"
                style={{ display: "none" }}
                onChange={handleDocumentChange}
                ref={documentInputRef}
              />
              <Button
                variant="contained"
                component="label"
                onClick={() => handleFolderIconClick(documentInputRef)}
                startIcon={<AddLinkIcon />}
                style={{
                  marginRight: "10px",
                  marginBottom: "5px",
                  background: "black",
                }}
              ></Button>
              <input
                type="file"
                id="photoInput"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handlePhotoChange}
                ref={photoInputRef}
              />
              <Button
                variant="contained"
                component="label"
                onClick={() => handleFolderIconClick(photoInputRef)}
                startIcon={<AddPhotoAlternateIcon />}
                style={{
                  marginRight: "10px",
                  marginBottom: "5px",
                  background: "black",
                }}
              ></Button>
              <Button
                variant="contained"
                component="label"
                startIcon={<PersonAddOutlinedIcon />}
                style={{ background: "black" }}
              ></Button>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            style={{ marginLeft: "200px", background: "#e7e4e4" }}
          >
            Submit
          </button>
        </Box>
      </div>
    </div>
  );
};

export default PostAnnouncementPage;
