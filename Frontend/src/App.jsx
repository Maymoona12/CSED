import React from "react";
import { Route, Routes } from "react-router-dom";
import Coverpage from "./pages/general-pages/CoverPage/coverpage";
import Signup from "./pages/general-pages/Signup/signup";
import Login from "./pages/general-pages/Login/login";
import Forgotpassword from "./pages/general-pages/PasswordPage/passwordpage";
import Home from "./pages/Home";

import LectureProfile from "./pages/UsersPage/Lecturer-Page/LecturerProfile";
import EditProfile from "./pages/UsersPage/Lecturer-Page/EditProfile";
import PostAnnouncementPage from "./pages/PostAnnouncement/PostAnnouncement";
import Appointment from "./pages/Appointment/Appointment";
import FoldersPage from "./pages/photo-archive/foldersPage";
import PhotosPage from "./pages/photo-archive/photospage";

import AdminPage from "./pages/UsersPage/AdminPage/AdminPage";

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
          <Route path="Home" element={<Home />} />
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
