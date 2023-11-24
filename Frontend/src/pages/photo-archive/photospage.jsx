// photospage.jsx :
import React, { useState } from "react";
import Modal from "react-responsive-modal";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import FoldersPage from "./foldersPage"; // Import the updated FoldersPage component

const PhotosPage = ({
  folders,
  selectedFolder,
  handlePhotoClick,
  lightboxOpen,
  lightboxIndex,
  setLightboxIndex,
  selectedPhoto,
  setSelectedPhoto,
}) => {
  // const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handleNextPhoto = () => {
    console.log("Handling next photo");
    if (selectedFolder) {
      setLightboxIndex((prevIndex) => {
        const currentFolder = folders.find(
          (folder) => folder.id === selectedFolder
        );
        const newIndex = (prevIndex + 1) % currentFolder.photos.length;
        console.log("New index:", newIndex);
        setSelectedPhoto(currentFolder.photos[newIndex]);
        return newIndex;
      });
    }
  };

  const handlePrevPhoto = () => {
    console.log("Handling previous  photo");
    if (selectedFolder) {
      setLightboxIndex((prevIndex) => {
        const currentFolder = folders.find(
          (folder) => folder.id === selectedFolder
        );
        const newIndex =
          (prevIndex - 1 + currentFolder.photos.length) %
          currentFolder.photos.length;
        console.log("New index:", newIndex);
        setSelectedPhoto(currentFolder.photos[newIndex]);
        return newIndex;
      });
    }
  };

  const handleCloseLightbox = () => {
    console.log("Closing lightbox");
    //setLightboxOpen(false);
    setSelectedPhoto(null);
  };

  const renderPhotos = () => {
    const currentFolder = folders.find(
      (folder) => folder.id === parseInt(selectedFolder)
    );

    if (!currentFolder) {
      return <div>No folder found</div>;
    }

    return (
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {currentFolder.photos.map((photo, index) => (
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
        ))}
      </div>
    );
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

      {/* Render photos */}
      {renderPhotos()}

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <Modal open={lightboxOpen} onClose={handleCloseLightbox} center>
          <div style={{ textAlign: "center" }}>
            {selectedPhoto && (
              <div>
                {/* Navigation buttons */}
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <IconButton onClick={handlePrevPhoto}>
                    <NavigateBeforeIcon />
                  </IconButton>
                  <IconButton onClick={handleNextPhoto}>
                    <NavigateNextIcon />
                  </IconButton>
                </div>

                {/* Enlarged Photo */}
                {selectedPhoto && (
                  <img
                    src={selectedPhoto.src}
                    alt={selectedPhoto.alt}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "70vh",
                      margin: "auto",
                      display: "block",
                    }}
                  />
                )}
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default PhotosPage;
