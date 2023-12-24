import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LecturerStyle.css";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import EditNoteIcon from "@mui/icons-material/EditNote";
import CampaignIcon from "@mui/icons-material/Campaign";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import PermMediaIcon from "@mui/icons-material/PermMedia";

const LectureProfile = () => {
  const [imageSrc, setImageSrc] = useState("ProfileImages/thaer.PNG");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="upc">
      <div className="gradiant"></div>
      <div className="profile-down">
        <div className="add-photo-container">
          <label htmlFor="imageInput">
            <AddAPhotoIcon className="add-photo-icon" />
          </label>
          <input
            type="file"
            id="imageInput"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </div>
        <img src={imageSrc} alt="Profile" />

        <div className="profile-title">Thaer Samar</div>

        <div className="profile-button">
          <div style={{ marginTop: "10px", marginRight: "100px" }}>
            <Link to="/EditProfile" style={{ marginLeft: "30px" }}>
              <EditNoteIcon />
            </Link>
            <h2 style={{ fontFamily: "Garamond" }}>Edit Profile</h2>
          </div>

          <div style={{ marginTop: "10px", marginRight: "100px" }}>
            <Link to="/PostAnnouncement" style={{ marginLeft: "70px" }}>
              <CampaignIcon />
            </Link>
            <h2 style={{ fontFamily: "Garamond" }}>Post Announcement</h2>
          </div>

          <div style={{ marginTop: "10px", marginRight: "100px" }}>
            <Link to="/AddAppointment" style={{ marginLeft: "50px" }}>
              <EditCalendarIcon />
            </Link>
            <h2 style={{ fontFamily: "Garamond" }}>Add Appointment</h2>
          </div>

          <div style={{ marginTop: "10px", marginRight: "100px" }}>
            <Link to="/ArchivePage" style={{ marginLeft: "30px" }}>
              <PermMediaIcon />
            </Link>
            <h2 style={{ fontFamily: "Garamond" }}>Archive Page</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LectureProfile;
