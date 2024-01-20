import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import EditNoteIcon from "@mui/icons-material/EditNote";
import CampaignIcon from "@mui/icons-material/Campaign";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import {
  Box,
  Button,
  Popover,
  Typography,
  Avatar,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
} from "@mui/material";
import useAuth from "../../../hooks/useAuth";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import ListItemIcon from "@mui/material/ListItemIcon";
import "./homeStyle.css";
import "./responsive.css";

const Home = () => {
  const [imageSrc, setImageSrc] = useState();
  const [popoverAnchor, setPopoverAnchor] = useState(null);
  const [editProfilePopover, setEditProfilePopover] = useState(null);
  const [postAnnouncementPopover, setPostAnnouncementPopover] = useState(null);
  const [addAppointmentPopover, setAddAppointmentPopover] = useState(null);
  const [archivePagePopover, setArchivePagePopover] = useState(null);
  const [AddPhotoPopover, setAddPhotoPopover] = useState(null);
  const [ViewSchedulePopover, setViewSchedulePopover] = useState(null);
  const [lecturerProfilePopover, setLecturerProfilePopover] = useState(null);
  const [changePasswordPopover, setChangePasswordPopover] = useState(null);

  const { getUser } = useAuth();
  const user = getUser();
  const [showScheduleCard, setShowScheduleCard] = useState(false);

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

  const handleViewScheduleClick = (event) => {
    setViewSchedulePopover(event.currentTarget);
    setShowScheduleCard(true);

    // Add the following lines to enable scrolling
    document.body.style.overflow = "auto";

    // Optionally, you can also set a specific height for the scrolling container
    // document.body.style.height = '100vh';
  };
  // Sample data for the table
  const scheduleData = [
    {
      day: "Sunday",
      timeInterval: "10:00 - 12:00 ",
      student: "Ahmad",
      reason: "Meeting",
    },
    {
      day: "Monday",
      timeInterval: "10:00 - 12:00 ",
      student: "Lena",
      reason: "Meeting",
    },
    {
      day: "Tuesday",
      timeInterval: "10:00 - 12:00 ",
      student: "Yazeed",
      reason: "Meeting",
    },
    {
      day: "Wedenday",
      timeInterval: "10:00 - 12:00 ",
      student: "Fatima",
      reason: "Meeting",
    },
    {
      day: "Thursday",
      timeInterval: "10:00 - 12:00 ",
      student: "Malak",
      reason: "Meeting",
    },

    // Add more sample data as needed
  ];

  return (
    <Stack className="upc">
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
              marginLeft: "20px",
            }}
          />
        </Tooltip>
      </div>

      <div className="profile-title" style={{ marginLeft: "42px" }}>
        {user?.name}
      </div>

      {(user?.role == "doctor" || user?.role == "admin") && (
        <div className="profile-button">
          <div style={{ marginTop: "10px", marginRight: "100px" }}>
            <Link to="/me/EditProfile" style={{ marginLeft: "50px" }}>
              <EditNoteIcon
                style={{
                  marginInline: "15px",
                  marginTop: "10px",
                  fontSize: 25,
                }}
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
                style={{
                  marginInline: "15px",
                  marginTop: "10px",
                  fontSize: 25,
                }}
              />
              <Button
                onMouseEnter={(event) =>
                  handleButtonHover(event, setPostAnnouncementPopover)
                }
                onMouseLeave={() =>
                  handleButtonLeave(setPostAnnouncementPopover)
                }
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
                style={{
                  marginInline: "12px",
                  marginTop: "10px",
                  fontSize: 25,
                }}
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
            <Link to="/me/ArchivePage" style={{ marginLeft: "50px" }}>
              <PermMediaIcon
                style={{
                  marginInline: "15px",
                  marginTop: "10px",
                  fontSize: 25,
                }}
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
            <Link to="/me/AddPhoto" style={{ marginLeft: "0px" }}>
              <AddPhotoAlternateIcon
                style={{
                  marginInline: "15px",
                  marginTop: "10px",
                  fontSize: 25,
                }}
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

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "40px",
              padding: "30px",
              marginTop: "10px",
            }}
          >
            <Box
              style={{
                width: "300px",
                border: "1px solid lightgray",
                height: "200px",
                padding: "30px",
                borderRadius: "10px",
                marginTop: "10px",
                marginLeft: "10px",
              }}
            >
              <div style={{ color: "black", marginBottom: "20px" }}>
                <div style={{ display: "flex", marginBottom: "30px" }}>
                  <ListItemIcon style={{ color: "black" }}>
                    <AccountBalanceIcon />
                  </ListItemIcon>
                  <Typography style={{ marginRight: "7px" }}>
                    {user?.education_level}
                  </Typography>
                </div>

                <div style={{ display: "flex", marginBottom: "30px" }}>
                  <ListItemIcon style={{ color: "black" }}>
                    <ApartmentIcon />
                  </ListItemIcon>
                  <Typography style={{ marginRight: "7px" }}>
                    {user?.office_no}
                  </Typography>
                </div>

                <div style={{ display: "flex", marginBottom: "30px" }}>
                  <ListItemIcon style={{ color: "black" }}>
                    <PhoneIcon />
                  </ListItemIcon>
                  <Typography style={{ marginRight: "7px" }}>
                    {user?.phone_no}
                  </Typography>
                </div>

                <div style={{ display: "flex", marginBottom: "30px" }}>
                  <ListItemIcon style={{ color: "black" }}>
                    <EmailIcon />
                  </ListItemIcon>
                  <Typography style={{ marginRight: "7px" }}>
                    {user?.email}
                  </Typography>
                </div>
              </div>
            </Box>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "40px",
              padding: "30px",
              marginTop: "10px",
            }}
          >
            <Box
              style={{
                width: "500px",
                border: "1px solid lightgray",
                height: "auto",
                padding: "30px",
                borderRadius: "10px",
                marginTop: "10px",
                marginLeft: "10px",
              }}
            >
              <Typography
                variant="h5"
                style={{
                  marginBottom: "20px",
                  color: "black",
                  fontFamily: "serif",
                }}
              >
                Schedule Data
              </Typography>
              <div
                style={{
                  maxWidth: "auto",
                }}
              >
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Day</TableCell>
                        <TableCell>Start At</TableCell>
                        <TableCell>End At</TableCell>
                        <TableCell>Student</TableCell>
                        <TableCell>Reason</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {scheduleData.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell>{row.day}</TableCell>
                          <TableCell>
                            {row.timeInterval.split(" - ")[0]}
                          </TableCell>
                          <TableCell>
                            {row.timeInterval.split(" - ")[1]}
                          </TableCell>
                          <TableCell>{row.student}</TableCell>
                          <TableCell>{row.reason}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </Box>
          </div>
        </div>
      )}
      {user?.role == "student" && (
        <div className="profile-button">
          <div style={{ marginTop: "10px", marginRight: "100px" }}>
            <Link to="/me/LecturersProfile" style={{ marginLeft: "20px" }}>
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
            <Link to="/me/GalleryPage" style={{ marginRight: "50px" }}>
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
        </div>
      )}
    </Stack>
  );
};

export default Home;
