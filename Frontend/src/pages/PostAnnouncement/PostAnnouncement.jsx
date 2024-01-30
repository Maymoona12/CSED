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

const PostAnnouncement = () => {
  const { mutate } = usePostAnnouncement();
  const [title, setTitle] = useState("");
  const [text_ann, setTextAnn] = useState("");
  const [file, setFile] = useState([]);
  const fileInputRef = useRef(null);

  const deleteFile = (index) => {
    const updatedFile = [...file];
    updatedFile.splice(index, 1);
    setFile(updatedFile);
  };

  const editFile = (index) => {
    const input = document.createElement("input");
    input.type = "file";
    input.addEventListener("change", (event) => handleFileChange(event, index));
    input.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile ? [selectedFile] : []);
  };

  const handleFolderIconClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = () => {
    // Check if the file array has any items before accessing its properties
    if (file.length > 0) {
      // Construct a plain JavaScript object with the data
      const postData = {
        title: title,
        text_ann: text_ann,
        file: file[0]?.name, // Assuming you only upload one file
      };

      // Create a new FormData object and append the data as key-value pairs
      const formData = new FormData();
      Object.entries(postData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      console.log({ file });
      console.log("FormData:", formData); // Log formData before mutation
      mutate(formData);
    } else {
      // Handle the case when the file array is empty
      console.error("No file selected");
    }
  };

  // "doctor_id": 1,
  // "title": "subject",
  // "text_ann": "text",
  // "file": "1706554916.PNG",
  // "created_at": "2024-01-29T19:01:56.000000Z",
  // "updated_at": "2024-01-29T19:01:56.000000Z",
  // "id": 1

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

            <button
              onClick={handleSubmit}
              style={{
                marginTop: "10px",
                marginLeft: "330px",
                padding: "10px 20px",
                background: "#1f3f66",
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
              {file.length > 0 ? (
                <div>
                  {file.map((fileItem, index) => (
                    <div
                      key={index}
                      style={{ marginTop: "5px", marginLeft: "20px" }}
                    >
                      {fileItem.type.startsWith("image/") ? (
                        <img
                          src={URL.createObjectURL(fileItem)}
                          alt={`Image ${index + 1}`}
                          style={{ maxWidth: "180px", maxHeight: "180px" }}
                        />
                      ) : (
                        <span>{fileItem.name}</span>
                      )}

                      <EditIcon
                        style={{ marginLeft: "5px", cursor: "pointer" }}
                        onClick={() => editFile(index)}
                      />
                      <DeleteIcon
                        style={{ marginLeft: "10px", cursor: "pointer" }}
                        onClick={() => deleteFile(index)}
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

export default PostAnnouncement;
