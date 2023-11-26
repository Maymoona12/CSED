// photospage.jsx
import React, { useState, useEffect } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Modal from "react-responsive-modal";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const PhotosPage = ({
  folders,
  selectedFolder,
  selectedPhoto,
  handlePhotoClick,
  lightboxOpen,
  lightboxIndex,
  setLightboxOpen,
  setSelectedPhoto,
}) => {
  useEffect(() => {
    console.log("Selected Photo in PhotosPageContainer:", selectedPhoto);
    // This effect runs when lightboxOpen prop changes
    // If lightbox is closed, reset selectedPhoto to null
    if (!lightboxOpen) {
      setSelectedPhoto(null);
    }
  }, [lightboxOpen, selectedPhoto]);

  const [showControls, setShowControls] = useState(false);

  const showLightboxControls = () => {
    setShowControls(true);
  };

  const hideLightboxControls = () => {
    setShowControls(false);
  };

  const handleCloseLightbox = () => {
    setLightboxOpen(false);
    setSelectedPhoto(null); // Reset selected photo when closing the lightbox
  };

  const renderPhotos = () => {
    const currentFolder = folders.find(
      (folder) => folder.id === parseInt(selectedFolder)
    );

    if (!currentFolder) {
      return <div>No folder found</div>;
    }

    return (
      <ImageList
        sx={{
          width: "100%",
          height: "100%",
          marginTop: "50px",
          paddingTop: "100px",
        }}
        variant="woven"
        cols={3}
        gap={8}
      >
        {currentFolder.photos.map((photo, index) => (
          <ImageListItem
            key={photo.id}
            onClick={() =>
              handlePhotoClick(photo, index, selectedFolder, selectedPhoto)
            }
          >
            <img
              src={`/Images/${photo.src}`}
              alt={photo.alt}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                // marginTop: "10px",
                // paddingTop: "20px",
              }}
            />
          </ImageListItem>
        ))}
      </ImageList>
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
          <div
            style={{
              textAlign: "center",
              position: "relative",
            }}
            onMouseEnter={showLightboxControls}
            onMouseLeave={hideLightboxControls}
          >
            {showControls && (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: 0,
                  right: 0,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <button title="Next" onClick={handleNextPhoto}>
                  <NavigateNextIcon />
                </button>
                <button title="Next" onClick={handlePrevPhoto}>
                  <NavigateBeforeIcon />
                </button>
              </div>
            )}
            {selectedPhoto && (
              <div>
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
