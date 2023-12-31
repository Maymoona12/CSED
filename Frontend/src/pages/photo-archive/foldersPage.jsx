//folderspage:
import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import FilterRoundedIcon from "@mui/icons-material/FilterRounded";
import { useNavigate } from "react-router-dom";

const FoldersPage = ({
  folders,
  handleFolderClick,
  handlePhotoClick,
  setLightboxOpen,
  setSelectedPhoto,
}) => {
  const [selectedFolder, setSelectedFolder] = useState(null);
  const navigate = useNavigate();

  const handleClick = (folderId, callback) => {
    handleFolderClick(folderId);
    setSelectedFolder(folderId);

    // Navigate to photospage only if a folder is selected
    if (folderId) {
      if (callback && typeof callback === "function") {
        callback(); // Set lightboxOpen to true
      }
      navigate(`/PhotosPage/${folderId}`);
    }
  };

  return (
    <div>
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
            fontFamily: "Garamond",
            marginLeft: "10px",
          }}
        >
          Photo Archive
        </h1>
      </div>
      {/* Render folders */}
      <div style={{ display: "flex", flexWrap: "wrap", marginTop: "100px" }}>
        {folders &&
          folders.map((folder) => (
            <div
              key={folder.id}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginRight: "100px",
                marginBottom: "10px",
                marginLeft: "10px",
                textAlign: "center",
                color: "black",
              }}
            >
              <FilterRoundedIcon
                style={{
                  marginBottom: "5px",
                  fontSize: "40px",
                  color: "black",
                  cursor: "pointer",
                }}
                onClick={() =>
                  handleClick(folder.id, () => setLightboxOpen(true))
                }
              />
              <h2
                onClick={() => handleClick(folder.id, setLightboxOpen(true))}
                style={{
                  cursor: "pointer",
                  fontFamily: "Garamond",
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
            .flatMap(
              (folder) =>
                folder.photos &&
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
