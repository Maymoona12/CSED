//PhotosPageContainer.jsx:
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import PhotosPage from "./photospage";

const PhotosPageContainer = ({
  folders,
  handlePhotoClick,
  lightboxOpen,
  lightboxIndex,
  setLightboxOpen,
  setSelectedPhoto,
}) => {
  const { folderId } = useParams();
  const [selectedFolder, setSelectedFolder] = useState(folderId);

  const handlePhotoClickWrapper = (photo, index, clickedFolderId) => {
    const clickedFolder =
      clickedFolderId !== undefined ? clickedFolderId : selectedFolder;
    setSelectedFolder(clickedFolder);
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
      setSelectedPhoto={setSelectedPhoto} // Pass setSelectedPhoto here
    />
  );
};

export default PhotosPageContainer;
