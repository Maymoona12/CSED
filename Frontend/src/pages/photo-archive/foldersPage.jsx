//FoldersPage:
import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import FilterRoundedIcon from "@mui/icons-material/FilterRounded";
import PhotosPage from "./photospage";

const FoldersPage = ({
  folders = [], // Add this line  selectedFolder,
  selectedFolder,
  handleFolderClick,
  handlePhotoClick,
}) => {
  // console.log("Folders:", folders); // Add this line
  // console.log("Selected Folder:", selectedFolder); // Add this line
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
          marginTop: "5px",
          paddingTop: "30px",
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
      {/* Render selected folder's photos */}
      {selectedFolder !== null && selectedFolder !== undefined && (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {folders
            .filter((folder) => folder.id === selectedFolder)
            .map((folder) =>
              folder.photos.map((photo) => (
                <div
                  key={photo.id}
                  style={{ margin: "8px", width: "150px", cursor: "pointer" }}
                  onClick={() => handlePhotoClick(photo)}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
              ))
            )}
        </div>
      )}

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
            }}
          >
            <FilterRoundedIcon
              style={{
                marginBottom: "5px",
                fontSize: "40px",
                color: "black",
                cursor: "pointer",
              }}
              onClick={() => handleFolderClick(folder.id)}
            />
            <h2
              onClick={() => handleFolderClick(folder.id)}
              style={{
                cursor: "pointer",
                fontFamily: "Lucida Handwriting",
              }}
            >
              {folder.name}
            </h2>
            <pre>{JSON.stringify(folder, null, 2)}</pre>
          </div>
        ))}
      </div>

      {/* Render PhotosPage component */}
      <PhotosPage
        selectedFolder={selectedFolder}
        folders={folders}
        handlePhotoClick={handlePhotoClick}
      />
    </div>
  );
};

export default FoldersPage;
