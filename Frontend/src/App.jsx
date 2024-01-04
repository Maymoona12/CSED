// //app.jsx:

// Archive Page:)
// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
// import LecturerHome from "./pages/UsersPage/Lecturer-Page/LecturerHome";
// import LectureProfile from "./pages/UsersPage/Lecturer-Page/LecturerProfile";
// import EditProfile from "./pages/UsersPage/Lecturer-Page/EditProfile";
// import PostAnnouncementPage from "./pages/PostAnnouncement/PostAnnouncement";
// import Appointment from "./pages/Appointment/Appointment";
// import FoldersPage from "./pages/photo-archive/foldersPage";
// import PhotosPage from "./pages/photo-archive/photospage

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
// // ________________________________________________________________

// // ***GeneralPages:
import React from "react";
import { Route, Routes } from "react-router-dom";
import Coverpage from "./pages/general-pages/CoverPage/coverpage";
import Signup from "./pages/general-pages/Signup/signup";
import Login from "./pages/general-pages/Login/login";
import Forgotpassword from "./pages/general-pages/PasswordPage/passwordpage";

import LecturerHome from "./pages/UsersPage/Lecturer-Page/LecturerHome";
import LectureProfile from "./pages/UsersPage/Lecturer-Page/LecturerProfile";
import EditProfile from "./pages/UsersPage/Lecturer-Page/EditProfile";
import PostAnnouncementPage from "./pages/PostAnnouncement/PostAnnouncement";
import Appointment from "./pages/Appointment/Appointment";
import FoldersPage from "./pages/photo-archive/foldersPage";
import PhotosPage from "./pages/photo-archive/photospage";

import AdminPage from "./pages/UsersPage/AdminPage/AdminPage";

import StudentHome from "./pages/UsersPage/StudentPage/StudentHome";
import StudentProfile from "./pages/UsersPage/StudentPage/StudentProfile";
import LecturerProfiles from "./pages/Lecturer-Profiles/lecturerprofile";
import ChangePassword from "./pages/UsersPage/StudentPage/ChangePassword";
import BookAppointment from "./pages/Appointment/BookAppointment";
import ProtectedRoutes from "./utils/ProtectedRoutes ";
import AppLayout from "./components/AppLayout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Coverpage />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="passwordpage" element={<Forgotpassword />} />
        <Route path="me" element={<AppLayout />} />

        <Route element={ProtectedRoutes}>
          <Route path="Home" element={<LecturerHome />} />
          <Route path="StudentHome" element={<StudentHome />} />
        </Route>

        <Route element={ProtectedRoutes}>
          <Route path="LectureProfile" element={<LectureProfile />} />
          <Route path="EditProfile" element={<EditProfile />} />
          <Route path="PostAnnouncement" element={<PostAnnouncementPage />} />
          <Route path="AddAppointment" element={<Appointment />} />
          {/* <Route path="/ArchivePage" element={<FoldersPage />} />
            <Route path="/PhotosPage/:folderId" element={<PhotosPage />} /> */}
        </Route>
        <Route element={ProtectedRoutes}>
          <Route path="StudentProfile" element={<StudentProfile />} />
          <Route path="LecturersProfile" element={<LecturerProfiles />} />
          <Route path="ArchivePage" element={<FoldersPage />} />
          <Route path="PhotosPage/:folderId" element={<PhotosPage />} />
          <Route path="ChangePassword" element={<ChangePassword />} />
          <Route path="AddAppointment" element={<BookAppointment />} />
        </Route>

        <Route element={ProtectedRoutes}>
          <Route path="AdminPage" element={<AdminPage />} />
        </Route>
      </Routes>
    </>
  );
}
export default App;

// //___________________________________________________

//Admin page ;)
// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import AppBarLayout from "./pages/Component/AppBarLayout";
// function App() {
//   return (
//     <>
//       <Router>
//         <Routes>
//           <Route path="/" element={<AppBarLayout />} />
//         </Routes>
//       </Router>
//     </>
//   );
// }
// export default App;

// //_______________________________________________________________________

// Student-Page:

// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
// import StudentHome from "./pages/UsersPage/StudentPage/StudentHome";
// import StudentProfile from "./pages/UsersPage/StudentPage/StudentProfile";
// import LecturerProfiles from "./pages/Lecturer-Profiles/lecturerprofile";
// import FoldersPage from "./pages/photo-archive/foldersPage";
// import PhotosPage from "./pages/photo-archive/photospage";
// import ChangePassword from "./pages/UsersPage/StudentPage/ChangePassword";
// import BookAppointment from "./pages/Appointment/BookAppointment";

// const App = () => {
//   return (
//     <>
//       <Router>
//         <Routes>
//           <Route path="/" element={<StudentHome />} />
//           <Route path="/Profile" element={<StudentProfile />} />
//           <Route path="/LecturersProfile" element={<LecturerProfiles />} />
//           <Route path="/ArchivePage" element={<FoldersPage />} />
//           <Route path="/PhotosPage/:folderId" element={<PhotosPage />} />
//           <Route path="/ChangePassword" element={<ChangePassword />} />
//           <Route path="/AddAppointment" element={<BookAppointment />} />
//         </Routes>
//       </Router>
//     </>
//   );
// };

// export default App;

// //__________________________________________________________________________

// Lecturer-Page:

// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
// import LecturerHome from "./pages/UsersPage/Lecturer-Page/LecturerHome";
// import LectureProfile from "./pages/UsersPage/Lecturer-Page/LecturerProfile";
// import EditProfile from "./pages/UsersPage/Lecturer-Page/EditProfile";
// import PostAnnouncementPage from "./pages/PostAnnouncement/PostAnnouncement";
// import Appointment from "./pages/Appointment/Appointment";
// import FoldersPage from "./pages/photo-archive/foldersPage";
// import PhotosPage from "./pages/photo-archive/photospage";

// const App = () => {
//   return (
//     <>
//       <Router>
//         <Routes>
//           <Route path="/" element={<LecturerHome />} />
//           <Route path="/Profile" element={<LectureProfile />} />
//           <Route path="/EditProfile" element={<EditProfile />} />
//           <Route path="/PostAnnouncement" element={<PostAnnouncementPage />} />
//           <Route path="/AddAppointment" element={<Appointment />} />
//           <Route path="/ArchivePage" element={<FoldersPage />} />
//           <Route path="/PhotosPage/:folderId" element={<PhotosPage />} />
//         </Routes>
//       </Router>
//     </>
//   );
// };

// export default App;
