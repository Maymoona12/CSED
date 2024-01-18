import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./StudentProfile.css";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import EditNoteIcon from "@mui/icons-material/EditNote";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import { Button, Popover, Typography, Avatar, Tooltip } from "@mui/material";
import test from "../../../../CoverImages/image2.jpg";
import useAuth from "../../../hooks/useAuth";

const StudentProfile = () => {
  const [imageSrc, setImageSrc] = useState();
  const [popoverAnchor, setPopoverAnchor] = useState(null);
  const [lecturerProfilePopover, setLecturerProfilePopover] = useState(null);
  const [archivePagePopover, setArchivePagePopover] = useState(null);
  const [changePasswordPopover, setChangePasswordPopover] = useState(null);
  const [bookAnAppointmentPopover, setBookAnAppointmentPopover] =
    useState(null);
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
          {/* Hidden file input triggered by the label */}
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
              width: "100px",
              height: "100px",
              border: "2px solid #ccc",
            }}
          />
        </Tooltip>

        <div className="profile-title"> {user?.name}</div>

        <div className="profile-button">
          <div style={{ marginTop: "10px", marginRight: "100px" }}>
            <Link to="/me/LecturersProfile" style={{ marginRight: "50px" }}>
              <PeopleAltIcon
                style={{
                  marginInline: "10px",
                  marginTop: "10px",
                  fontSize: 25,
                }}
              />
            </Link>
            <Button
              onMouseEnter={(event) =>
                handleButtonHover(event, setLecturerProfilePopover)
              }
              onMouseLeave={() => handleButtonLeave(setLecturerProfilePopover)}
            ></Button>
            <Popover
              open={Boolean(lecturerProfilePopover)}
              anchorEl={lecturerProfilePopover}
              onClose={() => handleButtonLeave(setLecturerProfilePopover)}
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
                Lecturers Profile
              </Typography>
            </Popover>
          </div>

          <div style={{ marginTop: "10px", marginRight: "100px" }}>
            <Link to="/me/ArchivePage" style={{ marginRight: "50px" }}>
              <PermMediaIcon
                style={{
                  marginInline: "10px",
                  marginTop: "10px",
                  fontSize: 25,
                }}
              />
            </Link>
            <Button
              onMouseEnter={(event) =>
                handleButtonHover(event, setArchivePagePopover)
              }
              onMouseLeave={() => handleButtonLeave(setArchivePagePopover)}
            ></Button>
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
            <Link to="/me/ChangePassword" style={{ marginRight: "50px" }}>
              <EditNoteIcon
                style={{
                  marginInline: "15px",
                  marginTop: "10px",
                  fontSize: 25,
                }}
              />
            </Link>
            <Button
              onMouseEnter={(event) =>
                handleButtonHover(event, setChangePasswordPopover)
              }
              onMouseLeave={() => handleButtonLeave(setChangePasswordPopover)}
            ></Button>
            <Popover
              open={Boolean(changePasswordPopover)}
              anchorEl={changePasswordPopover}
              onClose={() => handleButtonLeave(setChangePasswordPopover)}
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
                Change Password
              </Typography>
            </Popover>
          </div>

          {/* <div style={{ marginTop: "10px", marginRight: "100px" }}>
            <Link to="/AddAppointment" style={{ marginRight: "50px" }}>
              <CalendarMonthIcon
                style={{
                  marginInline: "10px",
                  marginTop: "10px",
                  fontSize: 25,
                }}
              />
            </Link>
            <Button
              onMouseEnter={(event) =>
                handleButtonHover(event, setBookAnAppointmentPopover)
              }
              onMouseLeave={() =>
                handleButtonLeave(setBookAnAppointmentPopover)
              }
            ></Button>
            <Popover
              open={Boolean(bookAnAppointmentPopover)}
              anchorEl={bookAnAppointmentPopover}
              onClose={() => handleButtonLeave(setBookAnAppointmentPopover)}
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
                Book An Appointment
              </Typography>
            </Popover>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
