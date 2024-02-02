//folderspage:
import React, { useState } from "react";
import FilterRoundedIcon from "@mui/icons-material/FilterRounded";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Button from "@mui/material/Button";
import useGetFolders from "./useGetFolders";

const FoldersPage = ({
  selectedFolder,
  handleFolderClick,
  handlePhotoClick,
  setLightboxOpen,
}) => {
  const navigate = useNavigate();

  const { getUser } = useAuth();
  const user = getUser();
  const { folders: folders_data } = useGetFolders();

  const handleClick = (folder_Id, callback) => {
    handleFolderClick(folder_Id);
    if (folder_Id) {
      if (callback && typeof callback === "function") {
        callback(); // Set lightboxOpen to true
      }
      navigate(`/me/GalleryPage/photospage/${folder_Id}`);
    }
  };
  console.log(folders_data);

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
            fontFamily: "Sitka Heading",
            marginLeft: "10px",
          }}
        >
          Gallery Page
        </h1>
      </div>
      {/* Add Album button */}
      {user?.role === "doctor" || user?.role === "admin" ? (
        <div>
          <Link to="/me/AddAlbum">
            <Button
              style={{
                padding: "3px 20px",
                backgroundColor: "gray",
                color: "white",
                alignItems: "center ",
                marginLeft: "1%",
                marginTop: "1%",
              }}
            >
              <AddPhotoAlternateIcon
                style={{
                  color: "white",
                  margin: "3px",
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
        {folders_data?.map((folder, index) => (
          <div
            key={`${folder.id}-${index}`}
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
                color: "#1f3f66",
                cursor: "pointer",
              }}
              onClick={() =>
                handleClick(folder.id, () => setLightboxOpen(true))
              }
            />
            <h2
              onClick={() =>
                handleClick(folder?.id, () => setLightboxOpen(true))
              }
              style={{
                cursor: "pointer",
                fontFamily: "Sitka Heading",
                color: "#1f3f66",
              }}
            >
              {folder.folder_name}
            </h2>

            {/* Render selected folder's photos */}
            {selectedFolder === folders_data?.id && (
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {folders_data?.image?.map((photo, index) => (
                  <div
                    key={`${photo.id}-${index}`}
                    style={{
                      margin: "8px",
                      width: "150px",
                      cursor: "pointer",
                    }}
                    onClick={() => handlePhotoClick(photo, index)}
                  >
                    <img
                      src={`/Images/${photo.src}`}
                      alt={photo.alt}
                      style={{ width: "100%", height: "auto" }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoldersPage;
