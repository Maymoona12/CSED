import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import FoldersPage from "./foldersPage";
import PhotosPage from "./photospage";

function GalleryPage() {
  const [selectedFolder, setSelectedFolder] = useState("defaultFolder");
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const handleFolderClick = (folderId) => {
    setSelectedPhoto(null);
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <FoldersPage
              selectedFolder={selectedFolder}
              handleFolderClick={handleFolderClick}
              setSelectedPhoto={setSelectedPhoto}
              setLightboxOpen={setLightboxOpen}
            />
          }
        />
        <Route path="photospage/:folder_Id" element={<PhotosPage />} />
      </Routes>
    </>
  );
}

export default GalleryPage;
