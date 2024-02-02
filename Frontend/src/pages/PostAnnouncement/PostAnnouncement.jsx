import React, { useState, useRef } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddLinkIcon from "@mui/icons-material/AddLink";
import usePostAnnouncement from "./usePostAnnouncement";
import { setContentType } from "../../api";

const PostAnnouncement = () => {
  const { mutate } = usePostAnnouncement();
  const [title, setTitle] = useState("");
  const [text_ann, setTextAnn] = useState("");
  const [file, setFile] = useState([]);
  const fileInputRef = useRef(null);

  const deleteFile = () => {
    setFile([]); // Set file to an empty array to delete the file
  };

  const editFile = (index) => {
    const input = document.createElement("input");
    input.type = "file";
    input.addEventListener("change", (event) => handleFileChange(event, index));
    input.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile([selectedFile]);
  };

  const handleFolderIconClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("text_ann", text_ann);
    if (file.length > 0) {
      formData.append("file", file[0]);
    }

    console.log("FormData:", formData); // Log formData before mutation
    setContentType("multipart/form-data");
    mutate(formData);
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
            marginLeft: "40%",
            marginRight: "50%",
          }}
        >
          <h2
            style={{
              color: "#1f3f66",
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
          <TextField
            fullWidth
            id="title"
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
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
              value={text_ann}
              onChange={(e) => setTextAnn(e.target.value)}
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
                id="fileInput"
                style={{ display: "none" }}
                onChange={handleFileChange}
                ref={fileInputRef}
                // multiple
              />
              <Button
                type="form"
                variant="contained"
                component="label"
                onClick={handleFolderIconClick}
                startIcon={<AddLinkIcon />}
                style={{
                  flex: "0 0 auto",
                  width: "180px",
                  height: "40px",
                  marginTop: "10px",
                  marginRight: "10px",
                  marginBottom: "5px",
                  background: "#1f3f66",
                }}
              ></Button>
            </div>

            <Button
              onClick={handleSubmit}
              style={{
                marginTop: "10px",
                marginLeft: "49%",
                padding: "10px 35px",
                background: "#1f3f66",
                color: "white",
                cursor: "pointer",
                fontFamily: "Monaco",
                transition: "background 0.3s ease",
                fontSize: "16px",
              }}
            >
              Submit
            </Button>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ flex: 1, marginRight: "5px" }}>
              <div>
                <div style={{ marginTop: "5px", marginLeft: "20px" }}>
                  {file.length > 0 && file[0].type.startsWith("image/") ? (
                    <img
                      src={URL.createObjectURL(file[0])}
                      alt={`Image 1`}
                      style={{ maxWidth: "180px", maxHeight: "180px" }}
                    />
                  ) : (
                    file.length > 0 && <span>{file[0].name}</span>
                  )}
                  {file.length > 0 && (
                    <>
                      <EditIcon
                        style={{ marginLeft: "5px", cursor: "pointer" }}
                        onClick={() => editFile(0)}
                      />
                      <DeleteIcon
                        style={{ marginLeft: "10px", cursor: "pointer" }}
                        onClick={deleteFile}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default PostAnnouncement;
