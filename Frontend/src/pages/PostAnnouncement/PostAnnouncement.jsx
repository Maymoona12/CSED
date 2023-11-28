import React, { useState, useRef } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import AddLinkIcon from "@mui/icons-material/AddLink";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import FileViewer from "react-file-viewer";
import DocViewer from "react-doc-viewer";

const PostAnnouncementPage = () => {
  const [documentFiles, setDocumentFiles] = useState([]);
  const [photoFiles, setPhotoFiles] = useState([]);
  const [documentPreview, setDocumentPreview] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const documentInputRef = useRef(null);
  const photoInputRef = useRef(null);

  const handleDocumentChange = (e) => {
    const files = e.target.files;
    setDocumentFiles([...documentFiles, ...files]);

    // Assuming you want to preview only the first document file
    if (files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDocumentPreview(reader.result);
      };
      reader.readAsDataURL(files[0]);
    }
    // Create a preview URL for the document file (adjust for your specific file types)
    // setDocumentPreview(URL.createObjectURL(file));
  };

  const handlePhotoChange = (e) => {
    const files = e.target.files;
    setPhotoFiles([...photoFiles, ...files]);

    // Assuming you want to preview only the first photo file
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

  const handleSubmit = () => {
    // Handle the submission logic here
    console.log("Document:", documentFiles);
    console.log("Photo:", photoFiles);
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
            width: 490,
            height: 2000,
            maxWidth: "100%",
            border: "1px solid #ddd",
            padding: "50px",
            borderRadius: "20px",
            marginLeft: "350px",
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
                  marginRight: "10px",
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

            <Button
              variant="contained"
              component="label"
              startIcon={<PersonAddOutlinedIcon />}
              style={{
                flex: "0 0 auto",
                marginLeft: "40px",
                width: "120px",
                height: "40px",
                background: "black",
              }}
            ></Button>
          </div>
          <div>
            {documentPreview && documentFiles.length > 0 ? (
              <div>
                {documentFiles.map((file, index) => (
                  <div
                    key={index}
                    style={{ marginTop: "5px", marginLeft: "5px" }}
                  >
                    {file.name}
                  </div>
                ))}
              </div>
            ) : null}
            {photoPreview && photoFiles.length > 0 ? (
              <div>
                {photoFiles.map((file, index) => (
                  <div
                    key={index}
                    style={{ marginTop: "5px", marginLeft: "5px" }}
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Photo Preview"
                      style={{
                        marginTop: "10px",
                        marginLeft: "10px",
                        maxWidth: "100%",
                        maxHeight: "200px",
                      }}
                    />
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <button
            onClick={handleSubmit}
            style={{
              marginTop: "50px",
              marginLeft: "200px",
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
