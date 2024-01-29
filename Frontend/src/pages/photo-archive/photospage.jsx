import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const PhotosPage = ({ folders, selectedPhoto, setSelectedPhoto }) => {
  const { folderId } = useParams();
  const [selectedFolder, setSelectedFolder] = useState(folderId);
  const currentFolder = folders.find(
    (folder) => folder.id === parseInt(selectedFolder)
  );

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogIndex, setDialogIndex] = useState(0);
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });
  useEffect(() => {
    console.log("folderId:", folderId);
    console.log("selectedFolder:", selectedFolder);
    console.log("currentFolder:", currentFolder);
    setSelectedFolder(folderId);
  }, [folderId, selectedFolder]);

  const handlePhotoClick = (photo, index, clickedFolderId) => {
    const clickedFolder =
      clickedFolderId !== undefined ? clickedFolderId : selectedFolder;

    setSelectedFolder(clickedFolder);
    setSelectedPhoto(photo);
    setDialogIndex(index);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleNextPhoto = () => {
    setDialogIndex(
      (prevIndex) => (prevIndex + 1) % currentFolder.photos.length
    );
  };

  const handlePrevPhoto = () => {
    setDialogIndex(
      (prevIndex) =>
        (prevIndex - 1 + currentFolder.photos.length) %
        currentFolder.photos.length
    );
  };

  const handleImageLoad = (event) => {
    setImageDimensions({
      width: event.target.width,
      height: event.target.height,
    });

    setDialogSize(event.target.width);
  };

  const renderPhotos = () => {
    if (!currentFolder) {
      return <div>No folder found</div>;
    }

    return (
      <ImageList
        sx={{
          width: "100%",
          maxHeight: "710px",
          height: "100%",
          overflow: "hidden",
          marginTop: "30px",
          paddingTop: "80px",
          cursor: "pointer",
        }}
        variant="woven"
        cols={3}
        gap={15}
      >
        {currentFolder.photos.map((photo, index) => (
          <ImageListItem
            key={photo.id}
            onClick={() => {
              handlePhotoClick(photo, index, selectedFolder);
            }}
          >
            <img
              src={`/Images/${photo.src}`}
              alt={photo.alt}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </ImageListItem>
        ))}
      </ImageList>
    );
  };

  return (
    <div>
      {renderPhotos()}

      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        fullWidth
        maxWidth="xs"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
        id="dialog"
      >
        <DialogTitle>
          Photo {dialogIndex + 1} of {currentFolder.photos.length}
        </DialogTitle>
        <DialogContent style={{ overflow: "hidden" }}>
          {currentFolder.photos[dialogIndex] && (
            <img
              src={`/Images/${currentFolder.photos[dialogIndex].src}`}
              alt={currentFolder.photos[dialogIndex].alt}
              style={{
                width: "85%",
                // maxHeight: "710px",
                height: "auto",
                border: "8px solid black",
                boxSizing: "border-box",
              }}
              onLoad={handleImageLoad}
            />
          )}
        </DialogContent>
        <DialogActions>
          <IconButton
            onClick={handlePrevPhoto}
            disabled={currentFolder.photos.length <= 1}
          >
            <NavigateBeforeIcon />
          </IconButton>
          <IconButton
            onClick={handleNextPhoto}
            disabled={currentFolder.photos.length <= 1}
          >
            <NavigateNextIcon />
          </IconButton>
          <Button onClick={handleDialogClose} style={{ color: "black" }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PhotosPage;
