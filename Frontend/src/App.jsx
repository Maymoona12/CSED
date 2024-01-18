import React from "react";
import { Route, Routes } from "react-router-dom";
import AddPhoto from "./pages/photo-archive/add-photo";
import Signup from "./pages/general-pages/Signup/signup";
import Login from "./pages/general-pages/Login/login";
import Forgotpassword from "./pages/general-pages/PasswordPage/passwordpage";
import Home from "./pages/Home";

import LectureProfile from "./pages/UsersPage/Lecturer-Page/LecturerProfile";
import EditProfile from "./pages/UsersPage/Lecturer-Page/EditProfile/EditProfile";
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
import Unauthorized from "./components/Unauthorized";
import { userRole } from "./role";
import LandingPage from "./pages/general-pages/CoverPage/Landingpage";
import Snackbar from "./components/Snackbar";
import Applayout2 from "./components/AppBarLayout/Applaout2";

function App() {
  const { admin, doctor, student } = userRole;
  return (
    <>
      <Routes>
        <Route path="" element={<LandingPage />} />
        <Route path="/landingPage" element={<LandingPage />} />

        <Route path="/user" element={<Applayout2 />}>
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/signup" element={<Signup />} />
          <Route path="/user/passwordpage" element={<Forgotpassword />} />
        </Route>

        <Route path="/me" element={<AppLayout />}>
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route path="" element={<Home />} />
          <Route element={<ProtectedRoutes allowedRoles={[doctor]} />}>
            {/* <Route path="" element={<LectureProfile />} /> */}
            <Route path="/me/EditProfile" element={<EditProfile />} />
            <Route
              path="/me/PostAnnouncement"
              element={<PostAnnouncementPage />}
            />
            <Route path="/me/AddAppointment" element={<Appointment />} />
            <Route path="/me/AddPhoto" element={<AddPhoto />} />
            <Route path="/me/AdminPage" element={<AdminPage />} />
          </Route>

          <Route element={<ProtectedRoutes allowedRoles={[student]} />}>
            {/* <Route path="" element={<StudentProfile />} /> */}
            <Route path="LecturersProfile" element={<LecturerProfiles />} />
            <Route path="BookAppointment" element={<BookAppointment />} />
          </Route>

          <Route
            element={
              <ProtectedRoutes allowedRoles={[doctor, student, admin]} />
            }
          >
            <Route path="/me/ChangePassword" element={<ChangePassword />} />
            <Route path="/me/GalleryPage" element={<FoldersPage />} />
            <Route path="PhotosPage/:folderId" element={<PhotosPage />} />
          </Route>

          <Route element={<ProtectedRoutes allowedRoles={[admin]} />}>
            {/* <Route path="" element={<LectureProfile />} /> */}
            <Route path="AdminPage" element={<AdminPage />} />
            <Route path="EditProfile" element={<EditProfile />} />
            <Route path="PostAnnouncement" element={<PostAnnouncementPage />} />
            <Route path="AddAppointment" element={<Appointment />} />
            <Route path="AddPhoto" element={<AddPhoto />} />
          </Route>
        </Route>
      </Routes>
      <Snackbar />
    </>
  );
}

export default App;
