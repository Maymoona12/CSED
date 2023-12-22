import React from "react";
import "./StudentProfile.css";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

const StudentProfile = () => {
  return (
    <div className="upc">
      <div className="gradiant"></div>
      <div className="profile-down">
        <div className="add-photo-container">
          <AddAPhotoIcon className="add-photo-icon" />
        </div>
        <img src="Images/hamood1.jpg" alt="USER" />
        <div className="profile-title">Fatima Omar</div>
        <div className="profile-description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex numquam
          asperiores dolorum eligendi eius. Iure ut similique est nesciunt at
          beatae hic inventore accusantium dolor ea aperiam id, molestias
          soluta?
        </div>
        <div className="profile-button">
          <a href="#">Change Password</a>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
