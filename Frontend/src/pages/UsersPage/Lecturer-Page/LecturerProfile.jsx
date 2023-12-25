import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LecturerStyle.css";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import EditNoteIcon from "@mui/icons-material/EditNote";
import CampaignIcon from "@mui/icons-material/Campaign";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import { Button, Popover, Typography } from "@mui/material";

const LectureProfile = () => {
  const [imageSrc, setImageSrc] = useState("ProfileImages/thaer.PNG");
  const [popoverAnchor, setPopoverAnchor] = useState(null);
  const [editProfilePopover, setEditProfilePopover] = useState(null);
  const [postAnnouncementPopover, setPostAnnouncementPopover] = useState(null);
  const [addAppointmentPopover, setAddAppointmentPopover] = useState(null);
  const [archivePagePopover, setArchivePagePopover] = useState(null);
  const [popoverOpen, setPopoverOpen] = useState(false);

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

  const handleButtonHover = (event, setPopover) => {
    setPopover(event.currentTarget);
  };

  const handleButtonLeave = (setPopover) => {
    setTimeout(() => {
      setPopover(null);
    }, 1600);
  };

  const open = Boolean(popoverAnchor);

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
      </div>

      <div className="profile-title" style={{ marginLeft: "22px" }}>
        {" "}
        Thaer Samar
      </div>

      <div className="profile-button">
        <div style={{ marginTop: "10px", marginRight: "100px" }}>
          <Link to="/EditProfile" style={{ marginLeft: "20px" }}>
            <EditNoteIcon style={{ marginInline: "20px" }} />
            <Button
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              onMouseEnter={(event) =>
                handleButtonHover(event, setEditProfilePopover)
              }
              onMouseLeave={() => handleButtonLeave(setEditProfilePopover)}
            ></Button>
          </Link>
          <Popover
            open={Boolean(editProfilePopover)}
            anchorEl={editProfilePopover}
            onClose={() => handleButtonLeave(setEditProfilePopover)}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            transformOrigin={{ vertical: "top", horizontal: "center" }}
            PaperProps={{
              style: {
                background: "rgba(10, 10, 10, 0.8)",
                color: "white",
                padding: "10px",
                fontFamily: "Garamond",
              },
            }}
          >
            <Typography style={{ padding: "10px", fontFamily: "Garamond" }}>
              Edit Profile
            </Typography>
          </Popover>
        </div>
        <div style={{ marginTop: "10px", marginRight: "100px" }}>
          <Link to="/PostAnnouncement" style={{ marginLeft: "20px" }}>
            <CampaignIcon style={{ marginInline: "20px" }} />
            <Button
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              onMouseEnter={(event) =>
                handleButtonHover(event, setPostAnnouncementPopover)
              }
              onMouseLeave={() => handleButtonLeave(setPostAnnouncementPopover)}
            ></Button>
          </Link>
          <Popover
            open={Boolean(postAnnouncementPopover)}
            anchorEl={postAnnouncementPopover}
            onClose={() => handleButtonLeave(setPostAnnouncementPopover)}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            transformOrigin={{ vertical: "top", horizontal: "center" }}
            PaperProps={{
              style: {
                background: "rgba(10, 10, 10, 0.8)",
                color: "white",
                padding: "10px",
                fontFamily: "Garamond",
              },
            }}
          >
            <Typography style={{ padding: "10px", fontFamily: "Garamond" }}>
              Post Announcement
            </Typography>
          </Popover>
        </div>
        <div style={{ marginTop: "10px", marginRight: "100px" }}>
          <Link to="/AddAppointment" style={{ marginLeft: "0px" }}>
            <EditCalendarIcon style={{ marginInline: "20px" }} />
            <Button
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              onMouseEnter={(event) =>
                handleButtonHover(event, setAddAppointmentPopover)
              }
              onMouseLeave={() => handleButtonLeave(setAddAppointmentPopover)}
            ></Button>
          </Link>
          <Popover
            open={Boolean(addAppointmentPopover)}
            anchorEl={addAppointmentPopover}
            onClose={() => handleButtonLeave(setAddAppointmentPopover)}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            transformOrigin={{ vertical: "top", horizontal: "center" }}
            PaperProps={{
              style: {
                background: "rgba(10, 10, 10, 0.8)",
                color: "white",
                padding: "10px",
                fontFamily: "Garamond",
              },
            }}
          >
            <Typography style={{ padding: "10px", fontFamily: "Garamond" }}>
              Add Appointment
            </Typography>
          </Popover>
        </div>
        <div style={{ marginTop: "10px", marginRight: "100px" }}>
          <Link to="/ArchivePage" style={{ marginLeft: "20px" }}>
            <PermMediaIcon style={{ marginInline: "20px" }} />
            <Button
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              onMouseEnter={(event) =>
                handleButtonHover(event, setArchivePagePopover)
              }
              onMouseLeave={() => handleButtonLeave(setArchivePagePopover)}
            ></Button>
          </Link>
          <Popover
            open={Boolean(archivePagePopover)}
            anchorEl={archivePagePopover}
            onClose={() => handleButtonLeave(setArchivePagePopover)}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            transformOrigin={{ vertical: "top", horizontal: "center" }}
            PaperProps={{
              style: {
                background: "rgba(10, 10, 10, 0.8)",
                color: "white",
                padding: "10px",
                fontFamily: "Garamond",
              },
            }}
          >
            <Typography style={{ padding: "10px", fontFamily: "Garamond" }}>
              Archive Page
            </Typography>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default LectureProfile;
