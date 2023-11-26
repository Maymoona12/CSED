//PhotosPageContainer:
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import PhotosPage from "./photospage";

const PhotosPageContainer = ({ folders, selectedPhoto, setSelectedPhoto }) => {
  const { folderId } = useParams();
  const [selectedFolder, setSelectedFolder] = useState(folderId);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  console.log("Selected photo:", selectedPhoto);

  const handlePhotoClick = (photo, index, clickedFolderId) => {
    const clickedFolder =
      clickedFolderId !== undefined ? clickedFolderId : selectedFolder;

    setSelectedFolder(clickedFolder);
    setSelectedPhoto(photo);
    setLightboxIndex(index);
    setLightboxOpen(true);

    // Log the updated selectedPhoto
    console.log("Selected Photo in handlePhotoClick:", photo);
  };

  const handleNextPhoto = () => {
    console.log("handleNextPhoto called");
    if (selectedFolder) {
      setLightboxIndex((prevIndex) => {
        const currentFolder = folders.find(
          (folder) => folder.id === selectedFolder
        );

        if (currentFolder) {
          const newIndex = (prevIndex + 1) % currentFolder.photos.length;
          const newSelectedPhoto = currentFolder.photos[newIndex];
          console.log("New Selected Photo (Next):", newSelectedPhoto);

          setSelectedPhoto(newSelectedPhoto);
          return newIndex;
        } else {
          console.error("Current folder not found.");
          return prevIndex;
        }
      });
    } else {
      console.error("selectedFolder is not set.");
    }
  };

  const handlePrevPhoto = () => {
    console.log("handlePrevPhoto called");
    if (selectedFolder) {
      setLightboxIndex((prevIndex) => {
        const currentFolder = folders.find(
          (folder) => folder.id === selectedFolder
        );

        if (!currentFolder) {
          console.error("Current folder not found.");
          return prevIndex;
        }

        const newIndex =
          (prevIndex - 1 + currentFolder.photos.length) %
          currentFolder.photos.length;
        const newSelectedPhoto = currentFolder.photos[newIndex];
        console.log("New Selected Photo (Prev):", newSelectedPhoto);

        console.log("Before setSelectedPhoto (Next):", selectedPhoto);
        setSelectedPhoto(newSelectedPhoto);
        console.log("After setSelectedPhoto (Next):", selectedPhoto);
        return newIndex;
      });
    } else {
      console.error("selectedFolder is not set.");
    }
  };

  const handleCloseLightbox = () => {
    setLightboxOpen(false);
    setSelectedPhoto(null);
  };

  return (
    <PhotosPage
      folders={folders}
      selectedFolder={selectedFolder}
      handlePhotoClick={handlePhotoClick}
      setSelectedPhoto={setSelectedPhoto}
      lightboxOpen={lightboxOpen}
      lightboxIndex={lightboxIndex}
      setLightboxOpen={setLightboxOpen}
      handleNextPhoto={handleNextPhoto}
      handlePrevPhoto={handlePrevPhoto}
      handleCloseLightbox={handleCloseLightbox}
      selectedPhoto={selectedPhoto}
    />
  );
};

export default PhotosPageContainer;
