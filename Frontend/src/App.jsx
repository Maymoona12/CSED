import React from "react";
import { Route, Routes } from "react-router-dom";
import AddAlbum from "./pages/photo-archive/AddAlbum";
import Signup from "./pages/general-pages/Signup/signup";
import Login from "./pages/general-pages/Login/login";
import Home from "./pages/UsersPage/Home/Home";

import EditProfile from "./pages/UsersPage/Lecturer-Page/EditProfile/EditProfile";
import PostAnnouncementPage from "./pages/PostAnnouncement/PostAnnouncement";
import Appointment from "./pages/Appointment/Appointment";
import GalleryPage from "./pages/photo-archive/GalleryPage";

import LecturerProfiles from "./pages/Lecturer-Profiles/lecturerprofile";
import ChangePassword from "./pages/UsersPage/StudentPage/ChangePassword";
import ProtectedRoutes from "./utils/ProtectedRoutes ";
import AppLayout from "./components/AppLayout";
import Unauthorized from "./components/Unauthorized";
import { userRole } from "./role";
import LandingPage from "./pages/general-pages/CoverPage/Landingpage";
import Snackbar from "./components/Snackbar";
import Applayout2 from "./components/AppBarLayout/Applaout2";
import BookAppointment from "./pages/Appointment/BookAppointment/[id]/BookAppointment";

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
        </Route>

        <Route path="/me" element={<AppLayout />}>
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route path="" element={<Home />} />

          <Route element={<ProtectedRoutes allowedRoles={[doctor, admin]} />}>
            <Route path="/me/EditProfile" element={<EditProfile />} />
            <Route
              path="/me/PostAnnouncement"
              element={<PostAnnouncementPage />}
            />
            <Route path="/me/AddAppointment" element={<Appointment />} />
            <Route path="/me/AddAlbum" element={<AddAlbum />} />
          </Route>

          <Route element={<ProtectedRoutes allowedRoles={[student]} />}>
            <Route path="LecturersProfile" element={<LecturerProfiles />} />
            <Route
              path="/me/BookAppointment/:id"
              element={<BookAppointment />}
            />
          </Route>

          <Route
            element={
              <ProtectedRoutes allowedRoles={[doctor, student, admin]} />
            }
          >
            <Route path="/me/ChangePassword" element={<ChangePassword />} />
            <Route path="/me/GalleryPage/*" element={<GalleryPage />} />
          </Route>
        </Route>
      </Routes>
      <Snackbar />
    </>
  );
}

export default App;
