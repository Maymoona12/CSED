import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LecturerStyle.css";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import EditNoteIcon from "@mui/icons-material/EditNote";
import CampaignIcon from "@mui/icons-material/Campaign";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
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
    }, 1000);
  };
  // const handleButtonHover = () => {
  //   setPopoverOpen(true);
  // };

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

      <div className="profile-title">Thaer Samar</div>

      <div className="profile-button">
        <div style={{ marginTop: "10px", marginRight: "100px" }}>
          <Button
            onMouseEnter={(event) =>
              handleButtonHover(event, setEditProfilePopover)
            }
            onMouseLeave={() => handleButtonLeave(setEditProfilePopover)}
            style={{ cursor: "pointer" }}
          >
            <Link to="/EditProfile" style={{ marginLeft: "30px" }}>
              <EditNoteIcon />
            </Link>
          </Button>
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
          <Button
            onMouseEnter={(event) =>
              handleButtonHover(event, setPostAnnouncementPopover)
            }
            onMouseLeave={() => handleButtonLeave(setPostAnnouncementPopover)}
          >
            <Link to="/PostAnnouncement" style={{ marginLeft: "70px" }}>
              <CampaignIcon />
            </Link>
          </Button>
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
          <Button
            onMouseEnter={(event) =>
              handleButtonHover(event, setAddAppointmentPopover)
            }
            onMouseLeave={() => handleButtonLeave(setAddAppointmentPopover)}
          >
            <Link to="/AddAppointment" style={{ marginLeft: "50px" }}>
              <EditCalendarIcon />
            </Link>
          </Button>
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
          <Button
            onMouseEnter={(event) =>
              handleButtonHover(event, setArchivePagePopover)
            }
            onMouseLeave={() => handleButtonLeave(setArchivePagePopover)}
          >
            <Link to="/ArchivePage" style={{ marginLeft: "30px" }}>
              <PermMediaIcon />
            </Link>
          </Button>
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
