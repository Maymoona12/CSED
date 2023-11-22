import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import FilterRoundedIcon from "@mui/icons-material/FilterRounded";
import Modal from "react-responsive-modal";
import IconButton from "@mui/material/IconButton";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const PhotoArchivePage = () => {
  const [folders, setFolders] = useState([
    {
      id: 1,
      name: "PCPC",
      photos: [
        { id: 1, src: "Images/image1.jpg", alt: "PCPC 1" },
        { id: 2, src: "Images/image2.jpg", alt: "PCPC 2" },
      ],
    },
    {
      id: 2,
      name: "IC",
      photos: [
        { id: 3, src: "Images/image3.jpg", alt: "IC 1" },
        { id: 4, src: "Images/image4.jpg", alt: "IC 2" },
      ],
    },
    {
      id: 3,
      name: "Trips",
      photos: [
        { id: 5, src: "Images/image3.jpg", alt: "Trips 1" },
        { id: 6, src: "Images/image5.jpg", alt: "Trips 2" },
      ],
    },
    {
      id: 4,
      name: "Meetings",
      photos: [
        { id: 7, src: "Images/image44.jpg", alt: "Meetings 1" },
        { id: 8, src: "Images/image5.jpg", alt: "Meetings 2" },
      ],
    },
    {
      id: 5,
      name: "ACPC",
      photos: [
        { id: 9, src: "Images/image1.jpg", alt: "ACPC 1" },
        { id: 10, src: "Images/image3.jpg", alt: "ACPC 2" },
      ],
    },
    {
      id: 6,
      name: "2022",
      photos: [
        { id: 11, src: "Images/image2.jpg", alt: "2022 1" },
        { id: 12, src: "Images/image5.jpg", alt: "2022 2" },
        { id: 13, src: "Images/image5.jpg", alt: "2022 2" },
        { id: 14, src: "Images/image5.jpg", alt: "2022 2" },
      ],
    },
    // Add more folders
  ]);

  const [selectedFolder, setSelectedFolder] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const handleFolderClick = (folderId) => {
    setSelectedFolder(folderId === selectedFolder ? null : folderId);
    setSelectedPhoto(null);
  };
  const handlePhotoClick = (photo, index) => {
    setSelectedPhoto(photo);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };
  const handleCloseLightbox = () => {
    setLightboxOpen(false);
    setSelectedPhoto(null);
  };

  const handleNextPhoto = () => {
    if (selectedFolder) {
      setLightboxIndex((prevIndex) => {
        const currentFolder = folders.find(
          (folder) => folder.id === selectedFolder
        );
        return (prevIndex + 1) % currentFolder.photos.length;
      });
    }
  };

  const handlePrevPhoto = () => {
    if (selectedFolder) {
      setLightboxIndex((prevIndex) => {
        const currentFolder = folders.find(
          (folder) => folder.id === selectedFolder
        );
        return (
          (prevIndex - 1 + currentFolder.photos.length) %
          currentFolder.photos.length
        );
      });
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

      {/* Modal */}
      {/* Lightbox Modal */}
      {lightboxOpen && (
        <Modal open={lightboxOpen} onClose={handleCloseLightbox} center>
          <div style={{ textAlign: "center" }}>
            {selectedFolder && (
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
                color: selectedFolder === folder.id ? "blue" : "black",
                cursor: "pointer",
              }}
              onClick={() => handleFolderClick(folder.id)}
            />
            <h2
              onClick={() => handleFolderClick(folder.id)}
              style={{
                cursor: "pointer",
                color: selectedFolder === folder.id ? "blue" : "black",
                fontFamily: "Lucida Handwriting",
              }}
            >
              {folder.name}
            </h2>

            {/* Render photos inside the selected folder */}
            {selectedFolder === folder.id && (
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {folder.photos.map((photo) => (
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
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default PhotoArchivePage;
