import React from "react";
import { Link } from "react-router-dom";
import "./LecturerStyle.css";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

const LectureProfile = () => {
  return (
    <div className="upc">
      <div className="gradiant"></div>
      <div className="profile-down">
        <div className="add-photo-container">
          <AddAPhotoIcon className="add-photo-icon" />
        </div>
        <img src="ProfileImages/thaer.PNG" alt="Thaer2" />

        <div className="profile-title">Thaer Samar</div>
        <div className="profile-description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex numquam
          asperiores dolorum eligendi eius. Iure ut similique est nesciunt at
          beatae hic inventore accusantium dolor ea aperiam id, molestias
          soluta?
        </div>
        <div className="profile-button">
          <Link to="/EditProfile">Edit Profile</Link>
        </div>
      </div>
    </div>
  );
};

export default LectureProfile;
