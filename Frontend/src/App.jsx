//app.jsx:
// import React, { useState } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import FoldersPage from "./pages/photo-archive/foldersPage";
// import PhotosPage from "./pages/photo-archive/photospage";

// function App() {
//   const [selectedFolder, setSelectedFolder] = useState("defaultFolder");
//   const [selectedPhoto, setSelectedPhoto] = useState(null);
//   const [lightboxOpen, setLightboxOpen] = useState(false);

//   const foldersData = [
//     {
//       id: 1,
//       name: "PCPC",
//       photos: [
//         { id: 1, src: "pcpc1.jpg", alt: "PCPC 1" },
//         { id: 2, src: "pcpc2.jpg", alt: "PCPC 2" },
//         { id: 3, src: "pcpc3.jpg", alt: "PCPC 2" },
//         { id: 4, src: "pcpc4.jpg", alt: "PCPC 2" },
//         { id: 5, src: "pcpc5.jpg", alt: "PCPC 2" },
//         { id: 6, src: "pcpc6.jpg", alt: "PCPC 2" },
//       ],
//     },
//     {
//       id: 2,
//       name: "IC",
//       photos: [
//         { id: 1, src: "image3.jpg", alt: "IC 1" },
//         { id: 2, src: "image4.jpg", alt: "IC 2" },
//       ],
//     },
//     {
//       id: 3,
//       name: "Trips",
//       photos: [
//         { id: 1, src: "image3.jpg", alt: "Trips 1" },
//         { id: 2, src: "image5.jpg", alt: "Trips 2" },
//       ],
//     },
//     {
//       id: 4,
//       name: "Meetings",
//       photos: [
//         { id: 1, src: "image44.jpg", alt: "Meetings 1" },
//         { id: 2, src: "image5.jpg", alt: "Meetings 2" },
//       ],
//     },
//     {
//       id: 5,
//       name: "ACPC",
//       photos: [
//         { id: 1, src: "image1.jpg", alt: "ACPC 1" },
//         { id: 2, src: "image3.jpg", alt: "ACPC 2" },
//       ],
//     },
//     {
//       id: 6,
//       name: "2022",
//       photos: [
//         { id: 1, src: "image2.jpg", alt: "2022 1" },
//         { id: 2, src: "image5.jpg", alt: "2022 2" },
//         { id: 3, src: "image5.jpg", alt: "2022 2" },
//         { id: 4, src: "image5.jpg", alt: "2022 2" },
//         { id: 5, src: "hamood1.jpg", alt: "Mohammad 1" },
//       ],
//     },
//     {
//       id: 7,
//       name: "Mohammad",
//       photos: [
//         { id: 1, src: "hamood1.jpg", alt: "Mohammad 1" },
//         { id: 2, src: "hamood2.jpg", alt: "Mohammad 1" },
//         { id: 3, src: "hamood1.jpg", alt: "Mohammad 1" },
//       ],
//     },
//   ];

//   const handleFolderClick = (folderId) => {
//     setSelectedPhoto(null);
//     setSelectedFolder(folderId);
//   };

//   return (
//     <>
//       <Router>
//         <Routes>
//           <Route
//             path="/"
//             element={
//               <FoldersPage
//                 folders={foldersData}
//                 handleFolderClick={handleFolderClick}
//                 setSelectedPhoto={setSelectedPhoto}
//                 setLightboxOpen={setLightboxOpen}
//               />
//             }
//           />

//           <Route
//             path="/photospage/:folderId"
//             element={
//               <PhotosPage
//                 folders={foldersData}
//                 setSelectedPhoto={setSelectedPhoto}
//                 setLightboxOpen={setLightboxOpen}
//               />
//             }
//           />
//         </Routes>
//       </Router>
//     </>
//   );
// }

// export default App;

// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Coverpage from "./pages/general-pages/CoverPage/coverpage";
// import Signup from "./pages/general-pages/Signup/signup";
// import Login from "./pages/general-pages/Login/login";
// import ForgotPassword from "./pages/general-pages/PasswordPage/passwordpage";

// function App() {
//   return (
//     <>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Coverpage />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/passwordpage" element={<ForgotPassword />} />
//         </Routes>
//       </Router>
//     </>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LecturerProfiles from "./pages/Lecturer-Profiles/lecturerprofile";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LecturerProfiles/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
