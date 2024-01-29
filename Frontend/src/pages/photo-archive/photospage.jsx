import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import IconButton from "@mui/material/IconButton";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import UploadIcon from "@mui/icons-material/Upload";
import DeleteIcon from "@mui/icons-material/Delete";
import useAuth from "../../hooks/useAuth";

const PhotosPage = ({ folders, selectedPhoto, setSelectedPhoto }) => {
  const { folderId } = useParams();
  const [selectedFolder, setSelectedFolder] = useState(folderId);
  const currentFolder = folders.find(
    (folder) => folder.id === parseInt(selectedFolder)
  );

  const { getUser } = useAuth();
  const user = getUser();
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogIndex, setDialogIndex] = useState(0);
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });
  const documentInputRef = useRef(null);

  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [photoToDelete, setPhotoToDelete] = useState(null);

  // Add state variables
  const [documentFiles, setDocumentFiles] = useState([]);
  const [documentPreview, setDocumentPreview] = useState(null);

  useEffect(() => {
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
  };

  const handleDeleteConfirmationOpen = (photo) => {
    setPhotoToDelete(photo);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmationClose = () => {
    setPhotoToDelete(null);
    setDeleteConfirmationOpen(false);
  };

  const handleDeletePhoto = () => {
    // Implement your logic to delete the photo.
    // You can use the currentFolder, photoToDelete, and any other necessary information.
    // For example, if you have a function to delete a photo, you might do something like:
    // deletePhoto(currentFolder.id, photoToDelete.id);
    // After deleting the photo, you might want to refresh the page or update the state.
    // For simplicity, let's assume you have a refreshPhotos function to reload the photos.
    // refreshPhotos();
    // Close the delete confirmation dialog
    handleDeleteConfirmationClose();
  };

  const handleDocumentChange = (event) => {
    const files = event.target.files;

    // Update documentFiles state with the selected files
    setDocumentFiles([...documentFiles, ...files]);

    // Display a preview of the first selected file (you can customize this part)
    const reader = new FileReader();
    reader.onload = (e) => {
      setDocumentPreview(e.target.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const renderPhotos = () => {
    if (!currentFolder) {
      return <div>No folder found</div>;
    }

    return (
      <div>
        {/* Add New Photos */}
        {user?.role === "doctor" || user?.role === "admin" ? (
          <div>
            <input
              type="file"
              id="documentInput"
              style={{ display: "none" }}
              onChange={handleDocumentChange}
              ref={documentInputRef}
              multiple
              accept="image/*" // Add this line to accept only image files
            />
            <Button
              variant="contained"
              component="label"
              onClick={() => documentInputRef.current.click()}
              startIcon={<UploadIcon />}
              style={{
                flex: "0 0 auto",
                width: "260px",
                height: "40px",
                marginTop: "10px",
                fontFamily: "Monaco",
                background: "#1f3f66",
              }}
            >
              Upload New Photo
            </Button>
            {/* Display a preview of the first selected file (you can customize this part) */}
            {documentPreview && (
              <div>
                <img
                  src={documentPreview}
                  alt="Document Preview"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "200px",
                    marginTop: "10px",
                  }}
                />
              </div>
            )}
          </div>
        ) : null}
        <ImageList
          sx={{
            width: "100%",
            maxHeight: "710px",
            height: "100%",
            overflow: "hidden",
            marginTop: "30px",
            paddingTop: "80px",
          }}
          variant="woven"
          cols={3}
          gap={15}
        >
          {currentFolder.photos.map((photo, index) => (
            <ImageListItem
              key={photo.id}
              onClick={() => handlePhotoClick(photo, index, selectedFolder)}
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
              {user?.role === "doctor" || user?.role === "admin" ? (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    background: "rgba(255,255,255,0.8)",
                    padding: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IconButton
                    onClick={() => handleDeleteConfirmationOpen(photo)}
                    style={{ color: "#1f3f66" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              ) : null}
            </ImageListItem>
          ))}
        </ImageList>
      </div>
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
        <DialogContent style={{ overflow: "hidden", minHeight: "410px" }}>
          {currentFolder.photos[dialogIndex] && (
            <img
              src={`/Images/${currentFolder.photos[dialogIndex].src}`}
              alt={currentFolder.photos[dialogIndex].alt}
              style={{
                width: "100%",
                height: "auto",
                border: "3px solid gray",
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
          <Button onClick={handleDialogClose} style={{ color: "#1f3f66" }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmationOpen}
        onClose={handleDeleteConfirmationClose}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this photo?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteConfirmationClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeletePhoto} style={{ color: "red" }}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PhotosPage;
