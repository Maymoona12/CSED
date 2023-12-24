
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./StudentProfile.css";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

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
          />{" "}
        </div>
        <img src={imageSrc} alt="USER" />
        <div className="profile-title">Fatima Omar</div>
        <div className="profile-description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex numquam
          asperiores dolorum eligendi eius. Iure ut similique est nesciunt at
          beatae hic inventore accusantium dolor ea aperiam id, molestias
          soluta?
        </div>
        <div className="profile-button">
          <Link to="/ChangePassword">Change Password</Link>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
