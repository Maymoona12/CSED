import React, { useState, useRef } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddLinkIcon from "@mui/icons-material/AddLink";

const PostAnnouncementPage = ({ onSubmit }) => {
  const [announcementData, setAnnouncementData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [documentFiles, setDocumentFiles] = useState([]);
  const [documentPreview, setDocumentPreview] = useState(null);
  const [announcementText, setAnnouncementText] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const documentInputRef = useRef(null);

  const deleteDocumentFile = (index) => {
    const updatedDocumentFiles = [...documentFiles];
    updatedDocumentFiles.splice(index, 1);
    setDocumentFiles(updatedDocumentFiles);
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

  const handleFolderIconClick = (inputRef) => {
    inputRef.current.click();
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

  const handleSubmit = () => {
    const data = {
      title: "", // You might want to add a title here
      announcementText,
      documentFiles,
    };
    onSubmit(data);
    setAnnouncementText("");
    setDocumentFiles([]);
  };

  return (
    <div className="post-announcement-page">
      <div>
        <Box
          sx={{
            width: 600,
            height: "auto",
            maxWidth: "100%",
            border: "1px solid #ddd",
            padding: "50px",
            borderRadius: "20px",
            marginLeft: "50%",
            marginRight: "50%",
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
                  width: "180px",
                  height: "40px",
                  marginTop: "10px",
                  marginRight: "10px",
                  marginBottom: "5px",
                  background: "black",
                }}
              ></Button>
            </div>

            <button
              onClick={handleSubmit}
              style={{
                marginTop: "10px",
                marginLeft: "330px",
                padding: "10px 20px",
                background: "black",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                transition: "background 0.3s ease",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              Submit
            </button>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ flex: 1, marginRight: "5px" }}>
              {documentPreview && documentFiles.length > 0 ? (
                <div>
                  {documentFiles.map((file, index) => (
                    <div
                      key={index}
                      style={{ marginTop: "5px", marginLeft: "20px" }}
                    >
                      {file.type.startsWith("image/") ? (
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Image ${index + 1}`}
                          style={{ maxWidth: "180px", maxHeight: "180px" }}
                        />
                      ) : (
                        <span>{file.name}</span>
                      )}

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
          </div>
        </Box>
      </div>
    </div>
  );
};

export default PostAnnouncementPage;
