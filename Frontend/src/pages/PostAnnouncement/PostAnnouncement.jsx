import React, { useState, useRef, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import AddLinkIcon from "@mui/icons-material/AddLink";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import axios from "axios";

const PostAnnouncementPage = ({ onSubmit }) => {
  console.log("Type of onSubmit:", typeof onSubmit);
  const [announcementData, setAnnouncementData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [documentFiles, setDocumentFiles] = useState([]);
  const [photoFiles, setPhotoFiles] = useState([]);
  const [documentPreview, setDocumentPreview] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [announcementText, setAnnouncementText] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const documentInputRef = useRef(null);
  const photoInputRef = useRef(null);

  const deleteDocumentFile = (index) => {
    const updatedDocumentFiles = [...documentFiles];
    updatedDocumentFiles.splice(index, 1);
    setDocumentFiles(updatedDocumentFiles);
  };

  const deletePhotoFile = (index) => {
    const updatedPhotoFiles = [...photoFiles];
    updatedPhotoFiles.splice(index, 1);
    setPhotoFiles(updatedPhotoFiles);
  };

  const handleDocumentChange = (e) => {
    const files = e.target.files;
    setDocumentFiles([...documentFiles, ...files]);

    if (files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDocumentPreview(reader.result);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handlePhotoChange = (e) => {
    const files = e.target.files;
    setPhotoFiles([...photoFiles, ...files]);

    if (files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleFolderIconClick = (inputRef) => {
    inputRef.current.click();
  };

  const handleDeleteLecturer = (index) => {
    const updatedLecturerUsers = [...lecturerUsers];
    updatedLecturerUsers.splice(index, 1);
    setLecturerUsers(updatedLecturerUsers);
  };

  const handleEditLecturer = (index) => {
    setEditingIndex(index);
  };

  const editDocumentFile = (index) => {
    const input = document.createElement("input");
    input.type = "file";
    input.addEventListener("change", (event) => handleFileChange(event, index));
    input.click();
  };

  const handleFileChange = (event, index) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const updatedDocumentFiles = [...documentFiles];
      updatedDocumentFiles[index] = selectedFile;
      setDocumentFiles(updatedDocumentFiles);
    }
  };

  const editPhotoFile = (index) => {
    const input = document.createElement("input");
    input.type = "file";
    input.addEventListener("change", (event) =>
      handlePhotoFileChange(event, index)
    );
    input.click();
  };

  const handlePhotoFileChange = (event, index) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const updatedPhotoFiles = [...photoFiles];
      updatedPhotoFiles[index] = selectedFile;
      setPhotoFiles(updatedPhotoFiles);
    }
  };

  const handleSubmit = () => {
    // if (typeof onSubmit !== "function") {
    //   console.error("onSubmit is not a function!");
    //   return;
    // }
    const data = {
      title: "",
      announcementText,
      documentFiles,
      photoFiles,
    };

    onSubmit(data);
    setAnnouncementText("");
    setDocumentFiles([]);
    setPhotoFiles([]);
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
            width: 600,
            height: 2000,
            maxWidth: "100%",
            border: "1px solid #ddd",
            padding: "50px",
            borderRadius: "20px",
            marginLeft: "270px",
            marginRight: "100px",
          }}
        >
          <h2
            style={{
              color: "black",
              fontFamily: "Monaco",
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
              placeholder="Write your announcement text here..."
              value={announcementText}
              onChange={(e) => setAnnouncementText(e.target.value)}
              style={{
                width: "100%",
                marginTop: "8px",
                padding: "20px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "15px",
              alignItems: "center",
            }}
          >
            <div>
              <input
                type="file"
                id="documentInput"
                accept=".pdf,.doc,.docx"
                style={{ display: "none" }}
                onChange={handleDocumentChange}
                ref={documentInputRef}
                multiple
              />
              <Button
                variant="contained"
                component="label"
                onClick={() => handleFolderIconClick(documentInputRef)}
                startIcon={<AddLinkIcon />}
                style={{
                  flex: "0 0 auto",
                  width: "120px",
                  height: "40px",
                  marginRight: "180px",
                  marginBottom: "5px",
                  background: "black",
                }}
              ></Button>
            </div>

            <div>
              <input
                type="file"
                id="photoInput"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handlePhotoChange}
                ref={photoInputRef}
                multiple
              />
              <Button
                variant="contained"
                component="label"
                onClick={() => handleFolderIconClick(photoInputRef)}
                startIcon={<AddPhotoAlternateIcon />}
                style={{
                  flex: "0 0 auto",
                  width: "120px",
                  height: "40px",
                  marginRight: "10px",
                  marginLeft: "40px",
                  marginBottom: "5px",
                  background: "black",
                }}
              ></Button>
            </div>
          </div>

          <div style={{ display: "flex" }}>
            <div style={{ flex: 1, marginRight: "5px" }}>
              {documentPreview && documentFiles.length > 0 ? (
                <div>
                  {documentFiles.map((file, index) => (
                    <div
                      key={index}
                      style={{ marginTop: "5px", marginLeft: "70px" }}
                    >
                      {file.name}
                      <EditIcon
                        style={{ marginLeft: "5px", cursor: "pointer" }}
                        onClick={() => editDocumentFile(index)}
                      />
                      <DeleteIcon
                        style={{ marginLeft: "10px", cursor: "pointer" }}
                        onClick={() => deleteDocumentFile(index)}
                      />
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
            <div style={{ flex: 1, marginRight: "180px" }}>
              {photoPreview && photoFiles.length > 0 ? (
                <div>
                  {photoFiles.map((file, index) => (
                    <div
                      key={index}
                      style={{ marginTop: "5px", marginLeft: "10px" }}
                    >
                      <img
                        src={URL.createObjectURL(file)}
                        alt="Photo Preview"
                        style={{
                          marginTop: "10px",
                          marginLeft: "170px",
                          maxWidth: "100%",
                          maxHeight: "200px",
                        }}
                      />
                      <EditIcon
                        style={{ marginLeft: "5px", cursor: "pointer" }}
                        onClick={() => editPhotoFile(index)}
                      />
                      <DeleteIcon
                        style={{ marginLeft: "10px", cursor: "pointer" }}
                        onClick={() => deletePhotoFile(index)}
                      />
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            style={{
              marginTop: "50px",
              marginLeft: "250px",
              background: "#e7e4e4",
            }}
          >
            Submit
          </button>
        </Box>
      </div>
    </div>
  );
};

export default PostAnnouncementPage;
