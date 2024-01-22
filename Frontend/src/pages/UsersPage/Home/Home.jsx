import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import CampaignIcon from "@mui/icons-material/Campaign";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import {
  Container,
  Box,
  Button,
  Popover,
  Typography,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputAdornment,
} from "@mui/material";
import useAuth from "../../../hooks/useAuth";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import ListItemIcon from "@mui/material/ListItemIcon";
import "./style.css";
import "./responsive.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

const Home = () => {
  const [imageSrc, setImageSrc] = useState();
  const [lectures, setLectures] = useState([
    { id: 1, name: "Thear sammar", assistant: "PROF", phone: "123-456-7890" },
    {
      id: 2,
      name: "Yazeed Sleet",
      assistant: "Lecturer",
      phone: "987-654-3210",
    },
    { id: 3, name: "Anas Melhem", assistant: "PROF", phone: "123-456-7890" },
    {
      id: 4,
      name: "Nagham Hammad",
      assistant: "Lecturer",
      phone: "987-654-3210",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [newLecturerEmail, setNewLecturerEmail] = useState("");
  const [newLecturerPassword, setNewLecturerPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");

  const [role, setRole] = useState("doctor");
  const handleRole = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // const name = data.get("name");
    // const reg_no = data.get("reg_no");
    // const email = data.get("email");
    // const password = data.get("password");
    // const password_confirmation = data.get("password_confirmation");

    // mutate({ name, reg_no, email, password, password_confirmation });
  };

  const handleAddLecturer = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newLecturerEmail)) {
      setAlertMessage("Invalid email format!");
      setOpen(true);
      return;
    }
    if (newLecturerPassword !== enteredConfirmPassword) {
      setAlertMessage("Passwords do not match!");
      setOpen(true);
      return;
    }

    // Your existing logic for adding a lecturer

    setNewLecturerEmail("");
    setNewLecturerPassword("");
    setEnteredConfirmPassword("");

    // Close the Snackbar
    setOpen(false);
  };

  const handleDeleteLecture = (lectureId) => {
    // Remove the selected lecture from the state
    setLectures((prevLectures) =>
      prevLectures.filter((lecture) => lecture.id !== lectureId)
    );
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);

    // Additional logic based on the selected tab
    if (newValue === 0) {
      // Logic for the "Add New Lecturers" tab
    } else if (newValue === 1) {
      // Logic for the "Delete Lecturers" tab
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
  };

  // Function to filter lectures by name
  const filteredLectures = lectures.filter((lecture) =>
    lecture.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const { getUser } = useAuth();
  const user = getUser();

  const [dynamicPhotoPath, setDynamicPhotoPath] = useState(
    `/ProfileImages/${user?.photo}`
  );

  const textFieldStyle = {
    display: "none", // This will hide the TextField initially
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
        // update the dynamic photo path based on the uploaded file
        setDynamicPhotoPath(reader.result);
      };
      reader.readAsDataURL(file);
    }
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
      day: "Wednesday",
      timeInterval: "10:00 - 12:00 ",
      student: "Nagham",
      reason: "Meeting",
    },
  ];

  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

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
          <div>
            <img
              alt="User"
              src={dynamicPhotoPath || user?.photo}
              style={{
                width: 150,
                height: 150,
                border: "1px solid #ccc",
                borderRadius: "50%",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                objectFit: "cover",
                marginLeft: "20px",
                cursor: "pointer",
              }}
              onClick={() => document.getElementById("imageInput").click()} // trigger file input click
            />
          </div>
        </Tooltip>
      </div>

      <div
        className="profile-title"
        style={{ marginLeft: "42px", color: "#1f3f66" }}
      >
        {user?.name}
      </div>

      {(user?.role == "doctor" || user?.role == "admin") && (
        <div className="profile-button">
          <div style={{ marginTop: "20px", marginRight: "0px" }}>
            <Link to="/me/EditProfile" style={{ marginLeft: "50px" }}>
              <ManageAccountsIcon
                style={{
                  marginInline: "15px",
                  marginTop: "10px",
                  fontSize: 25,
                }}
              />
            </Link>

            <Typography
              style={{
                color: "#1f3f66",
                marginLeft: "50px",
                fontSize: "20px",
                fontFamily: "	Times New Roman",
              }}
            >
              Edit Profile
            </Typography>
          </div>
          <div style={{ marginTop: "20px", marginRight: "0px" }}>
            <Link to="/me/PostAnnouncement" style={{ marginLeft: "60px" }}>
              <CampaignIcon
                style={{
                  marginInline: "15px",
                  marginTop: "10px",
                  fontSize: 25,
                }}
              />
            </Link>
            <Typography
              style={{
                color: "#1f3f66",
                marginLeft: "50px",
                fontSize: "20px",
                fontFamily: "Times New Roman",
              }}
            >
              Post Announcement
            </Typography>
          </div>
          <div style={{ marginTop: "20px", marginRight: "0px" }}>
            <Link to="/me/AddAppointment" style={{ marginLeft: "60px" }}>
              <EditCalendarIcon
                style={{
                  marginInline: "12px",
                  marginTop: "10px",
                  fontSize: 25,
                }}
              />
            </Link>
            <Typography
              style={{
                color: "#1f3f66",
                marginLeft: "50px",
                fontSize: "20px",
                fontFamily: "	Times New Roman",
              }}
            >
              Add Appointment
            </Typography>
          </div>
          <div style={{ marginTop: "20px", marginRight: "0px" }}>
            <Link to="/me/GalleryPage" style={{ marginLeft: "50px" }}>
              <PermMediaIcon
                style={{
                  marginInline: "15px",
                  marginTop: "10px",
                  fontSize: 25,
                }}
              />
            </Link>
            <Typography
              style={{
                color: "#1f3f66",
                marginLeft: "50px",
                fontSize: "20px",
                fontFamily: "Times New Roman",
              }}
            >
              Gallery Page
            </Typography>
          </div>
          <div style={{ marginTop: "20px", marginRight: "0px" }}>
            <Link to="/me/AddAlbum" style={{ marginLeft: "50px" }}>
              <AddPhotoAlternateIcon
                style={{
                  marginInline: "15px",
                  marginTop: "10px",
                  fontSize: 25,
                }}
              />
            </Link>
            <Typography
              style={{
                color: "#1f3f66",
                marginLeft: "50px",
                fontSize: "20px",
                fontFamily: "Times New Roman",
              }}
            >
              Add Album
            </Typography>
          </div>
          <div style={{ marginTop: "20px", marginRight: "0px" }}>
            <Link to="/me/ChangePassword" style={{ marginLeft: "50px" }}>
              <KeyOutlinedIcon
                style={{
                  marginInline: "15px",
                  marginTop: "10px",
                  fontSize: 25,
                }}
              />
            </Link>
            <Typography
              style={{
                color: "#1f3f66",
                marginLeft: "50px",
                fontSize: "20px",
                fontFamily: "Times New Roman",
              }}
            >
              Change Password
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "40px",
                padding: "30px",
              }}
            >
              <Box
                style={{
                  width: "300px",
                  border: "1px solid lightgray",
                  height: "200px",
                  padding: "30px",
                  borderRadius: "10px",
                  marginTop: "-40%",
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

          {user?.role == "admin" && (
            <div>
              <Container
                sx={{
                  marginTop: 12,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "left",
                  justifyContent: "center",
                }}
              >
                <Tabs value={selectedTab} onChange={handleTabChange}>
                  <Tab label="Add New Lecturers" icon={<AddIcon />} />
                  <Tab label="Delete Lecturers" icon={<DeleteIcon />} />
                </Tabs>

                {selectedTab === 0 && (
                  <div>
                    <Box
                      style={{
                        marginTop: "10px",
                        border: "1px solid #ccc",
                        width: "50%",
                        height: "50%",
                        padding: "20px",
                        borderRadius: "10px",
                      }}
                    >
                      <TextField
                        style={textFieldStyle}
                        margin="normal"
                        required
                        fullWidth
                        id="role"
                        label="Role"
                        name="role"
                        autoComplete="role"
                        value={role}
                        onChange={handleRole}
                      />
                      <TextField
                        label="Register Number"
                        name="reg_no"
                        type="text"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                      />

                      <TextField
                        label="User Name"
                        name="name"
                        type="text"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        label="Email"
                        name="email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={newLecturerEmail}
                        onChange={(e) => setNewLecturerEmail(e.target.value)}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        id="password"
                        autoComplete="current-password"
                        variant="outlined"
                        value={newLecturerPassword}
                        onChange={(e) => setNewLecturerPassword(e.target.value)}
                        InputProps={{
                          endAdornment: (
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleTogglePasswordVisibility}
                            >
                              {showPassword ? (
                                <VisibilityIcon />
                              ) : (
                                <VisibilityOffIcon />
                              )}
                            </IconButton>
                          ),
                        }}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password_confirmation"
                        label="Confirm Password"
                        type={showConfirmPassword ? "text" : "password"}
                        id="password_confirmation"
                        autoComplete="current-password"
                        InputProps={{
                          endAdornment: (
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleToggleConfirmPasswordVisibility}
                            >
                              {showConfirmPassword ? (
                                <VisibilityIcon />
                              ) : (
                                <VisibilityOffIcon />
                              )}
                            </IconButton>
                          ),
                        }}
                        value={enteredConfirmPassword}
                        onChange={(e) =>
                          setEnteredConfirmPassword(e.target.value)
                        } // Update enteredConfirmPassword state
                      />

                      <Button
                        onClick={handleAddLecturer}
                        style={{
                          color: "white",
                          marginLeft: "40%",
                          background: "#1f3f66",
                        }}
                      >
                        Add
                      </Button>
                    </Box>
                  </div>
                )}

                {selectedTab === 1 && (
                  <div>
                    <Box
                      style={{
                        marginTop: "10px",
                        border: "1px solid #ccc",
                        width: "100%",
                        height: "100%",
                        padding: "20px",
                        borderRadius: "10px",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <TextField
                        variant="outlined"
                        size="small"
                        value={searchQuery}
                        fullWidth
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Enter lecturer's name"
                        style={{
                          marginBottom: "10px",
                          alignItems: "end",
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon />
                            </InputAdornment>
                          ),
                        }}
                      />

                      <TableContainer component={Paper}>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>ID</TableCell>
                              <TableCell>Name</TableCell>
                              <TableCell>Assistant</TableCell>
                              <TableCell>Phone</TableCell>
                              <TableCell>Delete</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {filteredLectures.map((lecture) => (
                              <TableRow key={lecture.id}>
                                <TableCell>{lecture.id}</TableCell>
                                <TableCell>{lecture.name}</TableCell>
                                <TableCell>{lecture.assistant}</TableCell>
                                <TableCell>{lecture.phone}</TableCell>
                                <TableCell>
                                  <IconButton
                                    style={{ color: "#1f3f66" }}
                                    onClick={() =>
                                      handleDeleteLecture(lecture.id)
                                    }
                                  >
                                    <ClearIcon />
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Box>
                  </div>
                )}
              </Container>
            </div>
          )}
        </div>
      )}
      {user?.role == "student" && (
        <div className="profile-button">
          <div
            style={{
              marginTop: "10px",
              marginRight: "90px",
              marginLeft: "10px",
            }}
          >
            <Link to="/me/LecturersProfile" style={{ marginLeft: "20px" }}>
              <PeopleAltIcon
                style={{
                  marginInline: "10px",
                  marginTop: "10px",
                  fontSize: 25,
                }}
              />
            </Link>
            <Typography
              style={{
                color: "#1f3f66",
                marginLeft: "10px",
                fontSize: "20px",
                fontFamily: "Times New Roman",
              }}
            >
              Lecturers Profile
            </Typography>
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
            <Typography
              style={{
                color: "#1f3f66",
                marginLeft: "-15px",
                fontSize: "20px",
                fontFamily: "Times New Roman",
              }}
            >
              Gallery Page
            </Typography>
          </div>

          <div style={{ marginTop: "10px", marginRight: "100px" }}>
            <Link to="/me/ChangePassword" style={{ marginRight: "50px" }}>
              <KeyOutlinedIcon
                style={{
                  marginInline: "15px",
                  marginTop: "10px",
                  fontSize: 25,
                }}
              />
            </Link>
            <Typography
              style={{
                color: "#1f3f66",
                marginLeft: "-20px",
                fontSize: "20px",
                fontFamily: "Times New Roman",
              }}
            >
              Change Password
            </Typography>
          </div>
        </div>
      )}
      <Snackbar
        open={open}
        autoHideDuration={10000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <div>
          <Alert
            onClose={() => {
              handleClose();
              setAlertMessage("");
            }}
            severity="error"
            sx={{ width: "100%" }}
          >
            {alertMessage}
          </Alert>
        </div>
      </Snackbar>
    </Stack>
  );
};

export default Home;
