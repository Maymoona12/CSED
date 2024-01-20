import React, { useState, useRef } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import UploadIcon from "@mui/icons-material/Upload";

const NewAlbum = ({ onSubmit }) => {
  const [documentFiles, setDocumentFiles] = useState([]);
  const [documentPreview, setDocumentPreview] = useState(null);
  const [announcementText, setAnnouncementText] = useState("");
  const documentInputRef = useRef(null);

  const deleteDocumentFile = (index) => {
    const updatedDocumentFiles = [...documentFiles];
    updatedDocumentFiles.splice(index, 1);
    setDocumentFiles(updatedDocumentFiles);
  };

  const handleDocumentChange = (e) => {
    const files = e.target.files;
    const isImage = Array.from(files).every((file) =>
      file.type.startsWith("image/")
    );

    if (isImage) {
      setDocumentFiles([...documentFiles, ...files]);

      if (files.length > 0) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setDocumentPreview(reader.result);
        };
        reader.readAsDataURL(files[0]);
      }
    }
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
      title: "",
      announcementText,
      documentFiles,
    };
    onSubmit(data);
    setAnnouncementText("");
    setDocumentFiles([]);
  };

  return (
    <div className="New-Album">
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
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2
            style={{
              color: "#1f3f66",
              fontFamily: "Monaco",
              marginBottom: "40px",
              marginLeft: "175px",
            }}
          >
            Create New Album
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
          <TextField fullWidth id="title" />
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
                onClick={() => documentInputRef.current.click()}
                startIcon={<UploadIcon />}
                style={{
                  flex: "0 0 auto",
                  width: "190px",
                  height: "40px",
                  marginTop: "10px",
                  marginBottom: "5px",
                  background: "primary",
                  fontFamily: "Monaco",
                  background: "#1f3f66",
                }}
              >
                Upload Photo
              </Button>
            </div>
            <button
              onClick={handleSubmit}
              style={{
                marginTop: "10px",
                marginLeft: "310px",
                padding: "10px 20px",
                background: "white",
                color: "blue",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontFamily: "Monaco",
                fontSize: "18px",
                color: "white",
                backgroundColor: "#1f3f66",
              }}
            >
              CREATE
            </button>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ flex: 1, marginRight: "5px" }}>
              {documentPreview && documentFiles.length > 0 ? (
                <div>
                  {documentFiles.map((file, index) => (
                    <div
                      key={index}
                      style={{ marginTop: "7px", marginLeft: "20px" }}
                    >
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index}`}
                        style={{
                          maxWidth: "135px",
                          maxHeight: "135px",
                          marginRight: "5px",
                        }}
                      />
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

export default NewAlbum;
