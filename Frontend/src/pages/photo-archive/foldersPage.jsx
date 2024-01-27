//folderspage:
import React, { useState } from "react";
import FilterRoundedIcon from "@mui/icons-material/FilterRounded";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Button from "@mui/material/Button";

const FoldersPage = ({
  folders,
  selectedFolder,
  handleFolderClick,
  handlePhotoClick,
  setLightboxOpen,
  setSelectedPhoto,
}) => {
  const navigate = useNavigate();

  const { getUser } = useAuth();
  const user = getUser();

  const handleClick = (folderId, callback) => {
    handleFolderClick(folderId);

    // Navigate to photospage only if a folder is selected
    if (folderId) {
      if (callback && typeof callback === "function") {
        callback(); // Set lightboxOpen to true
      }
      navigate(`/photospage/${folderId}`);
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          marginBottom: "10px",
        }}
      >
        <h1
          style={{
            color: "#1f3f66",
            fontFamily: "Garamond",
            marginLeft: "10px",
          }}
        >
          Gallery Page
        </h1>
      </div>
             {/* Add Album button */}
             {user?.role === "doctor" || user?.role === "admin" ? (
          <div> 
            <Link to="/me/AddAlbum" >
            <Button style={{ padding:"3px 20px" , 
            backgroundColor:"gray" ,
            color:"white", 
            alignItems: "center ",
            marginLeft:"1%", marginTop:"1%"}}>
            
            
            <AddPhotoAlternateIcon
                style={{
                  color: "white",
                  margin:"3px",
                  fontSize: 30,
                }}
              />
              Add Album
            </Button>
            </Link>
          </div>
        ) : null}
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
