
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LecturerStyle.css";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

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
          {/* Hidden file input triggered by the label */}
          <input
            type="file"
            id="imageInput"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </div>
        {/* <img src="ProfileImages/thaer.PNG" alt="Thaer2" /> */}
        <img src={imageSrc} alt="Profile" />

        </div>

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
