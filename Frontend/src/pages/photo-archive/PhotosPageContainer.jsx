//PhotosPageContainer.jsx:
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import PhotosPage from "./photospage";

const PhotosPageContainer = ({
  folders,
  handlePhotoClick,
  lightboxOpen,
  lightboxIndex,
  setLightboxOpen, // Correct the prop name
}) => {
  const { folderId } = useParams();
  const [selectedFolder, setSelectedFolder] = useState(folderId);

  const handlePhotoClickWrapper = (photo, index, clickedFolderId) => {
    const clickedFolder =
      clickedFolderId !== undefined ? clickedFolderId : selectedFolder;
    // console.log("Clicked photo object:", photo);
    // console.log(
    //   `Clicked on photo ${photo.alt} ${index + 1} in folder ${
    //     clickedFolder || "undefined"
    //   }`
    // );
    setSelectedFolder(clickedFolder);
    // console.log("Selected Folder:", clickedFolder);
    handlePhotoClick(photo, index, clickedFolder);
  };

  return (
    <PhotosPage
      folders={folders}
      selectedFolder={selectedFolder}
      handlePhotoClick={handlePhotoClickWrapper}
      lightboxOpen={lightboxOpen}
      lightboxIndex={lightboxIndex}
      setLightboxOpen={setLightboxOpen}
    />
  );
};

export default PhotosPageContainer;
