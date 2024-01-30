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
import EditIcon from "@mui/icons-material/Edit";

const PhotosPage = ({ folders, selectedPhoto, setSelectedPhoto }) => {
  const { folderId } = useParams();
  const [selectedFolder, setSelectedFolder] = useState(folderId);
  const currentFolder = folders.find(
    (folder) => folder.id === parseInt(selectedFolder)
  );
  const [file, setFile] = useState([]);
  const { getUser } = useAuth();
  const user = getUser();
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogIndex, setDialogIndex] = useState(0);
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });
  const documentInputRef = useRef(null);
  const [isAddButtonVisible, setAddButtonVisibility] = useState(false);
  const [documentPreview, setDocumentPreview] = useState(null);

  useEffect(() => {
    if (file.length > 0) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setDocumentPreview([e.target.result]);
      };
      reader.readAsDataURL(file[0]);
    } else {
      setDocumentPreview([]);
    }
  }, [file]);

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

  const handleDocumentChange = (event) => {
    const files = event.target.files;
    setFile((prevFiles) => [...prevFiles, ...files]);
    setAddButtonVisibility(true);

    // Display a preview for each selected file
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setDocumentPreview((prevPreviews) => [
          ...(prevPreviews ?? []),
          e.target.result,
        ]);
      };
      reader.readAsDataURL(file);
    });

    // You can use previews for any further logic or display purposes
  };

  const deleteFile = (index) => {
    const updatedFile = [...file];
    updatedFile.splice(index, 1);
    setFile(updatedFile);
  };

  const editFile = (index) => {
    const input = document.createElement("input");
    input.type = "file";
    input.addEventListener("change", (event) =>
      handleDocumentChange(event, index)
    );
    input.click();
  };

  const handleAdd = (event) => {
    event.preventDefault();
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
              accept="image/*"
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
              Upload New Photos
            </Button>

            {/* Display the "Add" button when files are added */}
            {isAddButtonVisible && (
              <Button
                variant="contained"
                onClick={() => {
                  // Handle the "Add" button click
                  // You can implement the logic to add the uploaded photos to the server
                  setAddButtonVisibility(false); // Hide the "Add" button after processing
                }}
                style={{
                  flex: "0 0 auto",
                  width: "90px",
                  marginLeft: "5%",
                  height: "40px",
                  marginTop: "10px",
                  fontFamily: "Monaco",
                  background: "#1f3f66",
                }}
              >
                Add
              </Button>
            )}

            {/* Display a preview of the first selected file (you can customize this part) */}
            {documentPreview && documentPreview.length > 0 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  display: "flex",
                }}
              >
                {documentPreview.map((preview, index) => (
                  <div
                    key={index}
                    style={{ marginRight: "10px", marginBottom: "10px" }}
                  >
                    <img
                      src={preview}
                      alt={`Document Preview ${index + 1}`}
                      style={{
                        maxWidth: "200px",
                        maxHeight: "200px",
                        marginTop: "10px",
                        display: "block", // Ensure each image is on a new line
                      }}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Display EditIcon and DeleteIcon for each uploaded photo */}
            {file.map((uploadedFile, index) => (
              <div key={index}>
                <IconButton
                  onClick={() => editFile(index)}
                  style={{ color: "#1f3f66" }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => deleteFile(index)}
                  style={{ color: "#1f3f66" }}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            ))}
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
    </div>
  );
};

export default PhotosPage;
