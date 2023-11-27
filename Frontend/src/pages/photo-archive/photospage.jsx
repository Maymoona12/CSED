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
import useMediaQuery from "@mui/material/useMediaQuery";

const PhotosPage = ({ folders, selectedPhoto, setSelectedPhoto }) => {
  const { folderId } = useParams();
  const [selectedFolder, setSelectedFolder] = useState(folderId);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogIndex, setDialogIndex] = useState(0);
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  const currentFolder = folders.find(
    (folder) => folder.id === parseInt(selectedFolder)
  );

  // const isMdScreen = useMediaQuery("(min-width:600px)");

  // useEffect(() => {
  //   const handleResize = () => {
  //     if (openDialog) {
  //       setDialogSize();
  //     }
  //   };

  //   window.addEventListener("resize", handleResize);

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, [openDialog]);

  // const setDialogSize = () => {
  //   // Set dialog size based on image width and screen size
  //   const dialogElement = document.getElementById("dialog");
  //   if (dialogElement) {
  //     const maxWidth = isMdScreen ? "md" : "xs";
  //     const maxDialogWidth = document.documentElement.clientWidth - 32; // Adjust 32 as needed for margin/padding
  //     const imageWidth = Math.min(imageDimensions.width, maxDialogWidth);

  //     dialogElement.style.width = `${imageWidth}px`;
  //     dialogElement.style.maxWidth = maxWidth;
  //   }
  // };

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
          height: "100%",
          marginTop: "50px",
          paddingTop: "100px",
          cursor: "pointer",
        }}
        variant="woven"
        cols={3}
        gap={8}
      >
        {currentFolder.photos.map((photo, index) => (
          <ImageListItem
            key={photo.id}
            onClick={() => {
              handlePhotoClick(photo, index, selectedFolder);
            }}
          >
            <img
              src={`/Images/${photo.src}?w=248&fit=crop&auto=format&dpr=2 2x`}
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
      <div id="BarId">
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
      </div>
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
          height: "105%",
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
                width: "100%",
                height: "auto",
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
