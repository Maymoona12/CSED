//folderspage:
import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import FilterRoundedIcon from "@mui/icons-material/FilterRounded";
import PhotosPage from "./photospage";
import { useNavigate } from "react-router-dom";

const FoldersPage = ({ folders, handleFolderClick, handlePhotoClick }) => {
  const [selectedFolder, setSelectedFolder] = useState(null);
  const navigate = useNavigate();

  const handleClick = (folderId) => {
    handleFolderClick(folderId);
    setSelectedFolder(folderId);

    // Navigate to photospage only if a folder is selected
    if (folderId) {
      navigate(`/photospage/${folderId}`);
    }
  };
  return (
    <div>
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
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          marginBottom: "10px",
          marginTop: "0px",
          paddingTop: "60px",
        }}
      >
        <h1
          style={{
            color: "black",
            fontFamily: "Brush Script MT",
          }}
        >
          Photo Archive
        </h1>
      </div>
      {/* Render folders */}
      <div style={{ display: "flex", flexWrap: "wrap", marginTop: "100px" }}>
        {folders.map((folder) => (
          <div
            key={folder.id}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginRight: "200px",
              marginBottom: "10px",
              textAlign: "center",
              color: "black",
            }}
          >
            {/* Use the folder's ID as a key */}
            <FilterRoundedIcon
              style={{
                marginBottom: "5px",
                fontSize: "40px",
                color: "black",
                cursor: "pointer",
              }}
              onClick={() => handleClick(folder.id)}
            />
            <h2
              onClick={() => handleClick(folder.id)}
              style={{
                cursor: "pointer",
                fontFamily: "Lucida Handwriting",
              }}
            >
              {folder.name}
            </h2>
          </div>
        ))}
      </div>
      {/* Render selected folder's photos */}
      {selectedFolder !== null && selectedFolder !== undefined && (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {folders
            .filter((folder) => folder.id === selectedFolder)
            .flatMap((folder) =>
              folder.photos.map((photo, index) => (
                <div
                  key={photo.id}
                  style={{ margin: "8px", width: "150px", cursor: "pointer" }}
                  onClick={() => handlePhotoClick(photo, index)}
                >
                  <img
                    src={`/Images/${photo.src}`}
                    alt={photo.alt}
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
              ))
            )}
        </div>
      )}
    </div>
  );
};

export default FoldersPage;
