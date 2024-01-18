import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LecturerStyle.css";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import EditNoteIcon from "@mui/icons-material/EditNote";
import CampaignIcon from "@mui/icons-material/Campaign";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Button, Popover, Typography, Avatar, Tooltip } from "@mui/material";
import useAuth from "../../../hooks/useAuth";

const LectureProfile = () => {
  const [imageSrc, setImageSrc] = useState();
  const [popoverAnchor, setPopoverAnchor] = useState(null);
  const [editProfilePopover, setEditProfilePopover] = useState(null);
  const [postAnnouncementPopover, setPostAnnouncementPopover] = useState(null);
  const [addAppointmentPopover, setAddAppointmentPopover] = useState(null);
  const [archivePagePopover, setArchivePagePopover] = useState(null);
  const [AddPhotoPopover, setAddPhotoPopover] = useState(null);
  const { getUser } = useAuth();
  const user = getUser();

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
        <Tooltip>
          <Avatar
            alt="User"
            src={imageSrc || user?.photo}
            style={{
              width: 100,
              height: 100,
              border: "1px solid #ccc",
              objectFit: "contain",
            }}
          />
        </Tooltip>
      </div>

      <div className="profile-title" style={{ marginLeft: "22px" }}>
        {user?.name}
      </div>

      <div className="profile-button">
        <div style={{ marginTop: "10px", marginRight: "100px" }}>
          <Link to="/me/EditProfile" style={{ marginLeft: "50px" }}>
            <EditNoteIcon
              style={{ marginInline: "15px", marginTop: "10px", fontSize: 25 }}
            />
            <Button
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
          <Link to="/me/PostAnnouncement" style={{ marginLeft: "50px" }}>
            <CampaignIcon
              style={{ marginInline: "15px", marginTop: "10px", fontSize: 25 }}
            />
            <Button
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
          <Link to="/me/AddAppointment" style={{ marginLeft: "50px" }}>
            <EditCalendarIcon
              style={{ marginInline: "12px", marginTop: "10px", fontSize: 25 }}
            />
            <Button
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
          <Link to="/-me/ArchivePage" style={{ marginLeft: "50px" }}>
            <PermMediaIcon
              style={{ marginInline: "15px", marginTop: "10px", fontSize: 25 }}
            />
            <Button
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
        <div style={{ marginTop: "10px", marginRight: "100px" }}>
          <Link to="/me/AddPhoto" style={{ marginLeft: "50px" }}>
            <AddPhotoAlternateIcon
              style={{ marginInline: "15px", marginTop: "10px", fontSize: 25 }}
            />
            <Button
              onMouseEnter={(event) =>
                handleButtonHover(event, setAddPhotoPopover)
              }
              onMouseLeave={() => handleButtonLeave(setAddPhotoPopover)}
            ></Button>
          </Link>
          <Popover
            open={Boolean(AddPhotoPopover)}
            anchorEl={AddPhotoPopover}
            onClose={() => handleButtonLeave(setAddPhotoPopover)}
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
              Create Album
            </Typography>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default LectureProfile;
