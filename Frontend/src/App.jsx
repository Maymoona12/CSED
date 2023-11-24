//app.jsx:
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useParams } from "react-router-dom";
import FoldersPage from "./pages/photo-archive/foldersPage";
import PhotosPage from "./pages/photo-archive/photospage";
import PhotosPageContainer from "./pages/photo-archive/PhotosPageContainer";

function App() {
  const [selectedFolder, setSelectedFolder] = useState("defaultFolder");
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const foldersData = [
    {
      id: 1,
      name: "PCPC",
      photos: [
        { id: 1, src: "image1.jpg", alt: "PCPC 1" },
        { id: 2, src: "image2.jpg", alt: "PCPC 2" },
      ],
    },
    {
      id: 2,
      name: "IC",
      photos: [
        { id: 3, src: "image3.jpg", alt: "IC 1" },
        { id: 4, src: "image4.jpg", alt: "IC 2" },
      ],
    },
    {
      id: 3,
      name: "Trips",
      photos: [
        { id: 5, src: "image3.jpg", alt: "Trips 1" },
        { id: 6, src: "image5.jpg", alt: "Trips 2" },
      ],
    },
    {
      id: 4,
      name: "Meetings",
      photos: [
        { id: 7, src: "image44.jpg", alt: "Meetings 1" },
        { id: 8, src: "image5.jpg", alt: "Meetings 2" },
      ],
    },
    {
      id: 5,
      name: "ACPC",
      photos: [
        { id: 9, src: "image1.jpg", alt: "ACPC 1" },
        { id: 10, src: "image3.jpg", alt: "ACPC 2" },
      ],
    },
    {
      id: 6,
      name: "2022",
      photos: [
        { id: 11, src: "image2.jpg", alt: "2022 1" },
        { id: 12, src: "image5.jpg", alt: "2022 2" },
        { id: 13, src: "image5.jpg", alt: "2022 2" },
        { id: 14, src: "image5.jpg", alt: "2022 2" },
      ],
    },
  ];

  const handleFolderClick = (folderId) => {
    // Your logic for handling folder clicks:
    // console.log(`Clicked on folder with ID: ${folderId}`);
    setSelectedPhoto(null);
    setSelectedFolder(folderId);
  };

  const handlePhotoClick = (photo, index, clickedFolder) => {
    // console.log("Clicked photo:", photo);
    // console.log(
    //   `Clicked on photo ${photo.alt} ${index + 1} in folder ${
    //     clickedFolder || "undefined"
    //   }`
    // );
    setSelectedFolder(clickedFolder);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <FoldersPage
                folders={foldersData}
                handleFolderClick={handleFolderClick}
                handlePhotoClick={handlePhotoClick}
                setSelectedPhoto={setSelectedPhoto}
              />
            }
          />

          <Route
            path="/photospage/:folderId"
            element={
              <PhotosPageContainer
                folders={foldersData}
                handlePhotoClick={handlePhotoClick}
                setLightboxOpen={setLightboxOpen}
                lightboxIndex={lightboxIndex}
                setLightboxIndex={setLightboxIndex}
              />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
