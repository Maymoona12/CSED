import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./StudentProfile.css";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import EditNoteIcon from "@mui/icons-material/EditNote";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PermMediaIcon from "@mui/icons-material/PermMedia";

const StudentProfile = () => {
  const [imageSrc, setImageSrc] = useState("Images/hamood1.jpg");

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
          {/* Hidden file input triggered by the label */}
          <input
            type="file"
            id="imageInput"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </div>
        <img src={imageSrc} alt="USER" />

        <div className="profile-title">Fatima Omar</div>

        <div className="profile-button">
          <div style={{ marginTop: "10px", marginRight: "100px" }}>
            <Link to="/LecturersProfile" style={{ marginLeft: "50px" }}>
              <PeopleAltIcon />
            </Link>
            <h2 style={{ fontFamily: "Garamond" }}>Lecturers Profile</h2>
          </div>

          <div style={{ marginTop: "10px", marginRight: "100px" }}>
            <Link to="/ArchivePage" style={{ marginLeft: "40px" }}>
              <PermMediaIcon />
            </Link>
            <h2 style={{ fontFamily: "Garamond" }}>Archive Page</h2>
          </div>

          <div style={{ marginTop: "10px", marginRight: "100px" }}>
            <Link to="/ChangePassword" style={{ marginLeft: "50px" }}>
              <EditNoteIcon />
            </Link>
            <h2 style={{ fontFamily: "Garamond" }}>Change Password</h2>
          </div>

          <div style={{ marginTop: "10px", marginRight: "100px" }}>
            <Link to="/AddAppointment" style={{ marginLeft: "70px" }}>
              <CalendarMonthIcon />
            </Link>
            <h2 style={{ fontFamily: "Garamond" }}>Book an Appointment</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
