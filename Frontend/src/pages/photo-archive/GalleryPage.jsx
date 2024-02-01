import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import FoldersPage from "./foldersPage";
import PhotosPage from "./photospage";


function GalleryPage() {
  const [selectedFolder, setSelectedFolder] = useState("defaultFolder");
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const foldersData = [
    {
      id: 1,
      name: "PCPC",
      photos: [
        { id: 1, src: "pcpc1.jpg", alt: "PCPC 1" },
        { id: 2, src: "pcpc2.jpg", alt: "PCPC 2" },
        { id: 3, src: "pcpc3.jpg", alt: "PCPC 2" },
        { id: 4, src: "pcpc4.jpg", alt: "PCPC 2" },
        { id: 5, src: "pcpc5.jpg", alt: "PCPC 2" },
        { id: 6, src: "pcpc6.jpg", alt: "PCPC 2" },
      ],
    },
    {
      id: 2,
      name: "IC",
      photos: [
        { id: 1, src: "image3.jpg", alt: "IC 1" },
        { id: 2, src: "image4.jpg", alt: "IC 2" },
      ],
    },
    {
      id: 3,
      name: "Trips",
      photos: [
        { id: 1, src: "image3.jpg", alt: "Trips 1" },
        { id: 2, src: "image5.jpg", alt: "Trips 2" },
      ],
    },
    {
      id: 4,
      name: "Meetings",
      photos: [
        { id: 1, src: "image44.jpg", alt: "Meetings 1" },
        { id: 2, src: "image5.jpg", alt: "Meetings 2" },
      ],
    },
    {
      id: 5,
      name: "ACPC",
      photos: [
        { id: 1, src: "image1.jpg", alt: "ACPC 1" },
        { id: 2, src: "image3.jpg", alt: "ACPC 2" },
      ],
    },
    {
      id: 6,
      name: "2022",
      photos: [
        { id: 1, src: "image2.jpg", alt: "2022 1" },
        { id: 2, src: "image5.jpg", alt: "2022 2" },
        { id: 3, src: "image5.jpg", alt: "2022 2" },
        { id: 4, src: "image5.jpg", alt: "2022 2" },
      ],
    },
  ];

  const handleFolderClick = (folderId) => {
    setSelectedPhoto(null);
    // setSelectedFolder(folderId);
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <FoldersPage
              folders={foldersData}
              selectedFolder={selectedFolder}
              handleFolderClick={handleFolderClick}
              setSelectedPhoto={setSelectedPhoto}
              setLightboxOpen={setLightboxOpen}
            />
          }
        />
        <Route
          path="photospage/:folderId"
          element={
            <PhotosPage
              folders={foldersData}
              selectedFolder={selectedFolder}
              setSelectedPhoto={setSelectedPhoto}
            />
          }
        />
      </Routes>
    </>
  );
}

export default GalleryPage;
