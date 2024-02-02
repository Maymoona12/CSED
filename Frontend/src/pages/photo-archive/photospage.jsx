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
import useUploadphoto from "./useUploadphoto";
import useGetFolders from "./useGetFolders";
import { setContentType } from "../../api";
import useGetPhoto from "./useGetPhoto";

const PhotosPage = () => {
  const { mutate } = useUploadphoto();
  const { folder_Id } = useParams();
  const { folders: folders_data } = useGetFolders();
  const { data: images } = useGetPhoto(folder_Id);
  const [selectedFolder, setSelectedFolder] = useState(folder_Id);
  const currentFolder = folders_data?.find(
    (folder) => folder.id === parseInt(selectedFolder)
  );
  const [image, setImage] = useState([]);
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
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    if (selectedPhoto && images) {
      const selectedIndex = images.findIndex(
        (photo) => photo.id === selectedPhoto.id
      );
      if (selectedIndex !== -1) {
        setDialogIndex(selectedIndex);
      }
    }
  }, [folder_Id, selectedPhoto, images]);

  const handlePhotoClick = (photo, index, clickedFolderId) => {
    const clickedFolder =
      clickedFolderId !== undefined ? clickedFolderId : selectedFolder;

    setSelectedFolder(clickedFolder);
    setSelectedPhoto(photo);
    setDialogIndex(index);
    setOpenDialog(true);
  };

  const handleNextPhoto = () => {
    setDialogIndex((prevIndex) => (prevIndex + 1) % images.length);
    setSelectedPhoto(images[(dialogIndex + 1) % images.length]);
  };

  const handlePrevPhoto = () => {
    setDialogIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
    setSelectedPhoto(images[(dialogIndex - 1 + images.length) % images.length]);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleImageLoad = (event) => {
    setImageDimensions({
      width: event.target.width,
      height: event.target.height,
    });
  };

  const handleDocumentChange = (event) => {
    const files = event.target.files;
    setImage((prevFiles) => [...prevFiles, ...files]);
    setAddButtonVisibility(true);

    // Display a preview for each selected file
    const previews = [];
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        previews.push(e.target.result);
      };
      reader.readAsDataURL(file); // Read each file as data URL
    });

    // Update the documentPreview state with all previews
    setDocumentPreview((prevPreviews) => [
      ...(prevPreviews ?? []),
      ...previews,
    ]);
  };

  const deleteFile = (index) => {
    const updatedFile = [...image];
    updatedFile.splice(index, 1);
    setImage(updatedFile);

    // Also update the documentPreview state when deleting a file
    setDocumentPreview((prevPreviews) => {
      const updatedPreviews = [...prevPreviews];
      updatedPreviews.splice(index, 1);
      return updatedPreviews;
    });
  };

  const editFile = (index) => {
    const input = document.createElement("input");
    input.type = "file";
    input.addEventListener("change", (event) =>
      handleDocumentChange(event, index)
    );
    input.click();
  };

  const handleAdd = () => {
    const formData = new FormData();

    if (image.length > 0) {
      formData.append("images[]", image[0]);
    }
    const selectedFolderData = folders_data.find(
      (folder) => folder.id === parseInt(folder_Id)
    );

    if (selectedFolderData) {
      const folder_id = selectedFolderData.id;
      formData.append("folder_id", folder_id);
      console.log("FormData:", formData);
      setContentType("multipart/form-data");
      mutate(formData);
      setAddButtonVisibility(true);
    } else {
      console.error("Selected folder data not found");
    }
  };

  const renderPhotos = () => {
    if (!currentFolder) {
      return <div>No folder found</div>;
    }
    return (
      <div>
        {user?.role === "doctor" || user?.role === "admin" ? (
          <div>
            <input
              type="file"
              name="images[]"
              style={{
                position: "absolute",
                top: "-1000px",
                left: "-1000px",
              }}
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
                type="submit"
                variant="contained"
                onClick={handleAdd}
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
            {/* Display a preview of all selected files */}
            {documentPreview && documentPreview.length > 0 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {documentPreview.map((preview, index) => (
                  <div
                    key={index}
                    style={{
                      marginLeft: "10px",
                      marginBottom: "2px",
                      flex: "0 0 auto",
                    }}
                  >
                    <img
                      src={preview}
                      alt={`Document Preview ${index + 1}`}
                      style={{
                        width: "220px",
                        height: "220px",
                        marginTop: "10px",
                      }}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Display EditIcon and DeleteIcon for each uploaded photo */}
            {image.map((index) => (
              <div key={index}>
                <IconButton
                  onClick={() => editFile(index)}
                  style={{
                    color: "#1f3f66",
                    marginLeft: "10%",
                    marginTop: "0",
                  }}
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
            height: "100%",
            overflow: "hidden",
            marginTop: "30px",
            paddingTop: "80px",
          }}
          variant="woven"
          cols={3}
          gap={15}
        >
          {images?.map((photo, index) => (
            <ImageListItem
              key={photo.id}
              onClick={() => handlePhotoClick(photo, index, selectedFolder)}
            >
              <img
                src={`/public/Images/${photo?.image}`}
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
          Photo {dialogIndex + 1} of {images?.length}
        </DialogTitle>
        <DialogContent style={{ overflow: "hidden", minHeight: "410px" }}>
          {selectedPhoto && (
            <img
              src={`/public/Images/${selectedPhoto?.image}`}
              alt={selectedPhoto?.alt}
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
          <IconButton onClick={handlePrevPhoto} disabled={images?.length <= 1}>
            <NavigateBeforeIcon />
          </IconButton>
          <IconButton onClick={handleNextPhoto} disabled={images?.length <= 1}>
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
