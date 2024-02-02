import React, { useState, useRef } from "react";
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
import usebookedAppointment from "./useBookedApp";
import useReject from "./useReject";
import uselecturersprofile from "../../Lecturer-Profiles/uselecturersprofile";
import useDoctorRegister from "./useDoctorRegister";
import useDeleteAcc from "./useDeleteAcc";
import useAddFile from "./useAddFile";
import usechangePhoto from "./useindexChangePhoto";
import { setContentType } from "../../../api";

const Home = () => {
  const { getUser } = useAuth();
  const user = getUser();
  const [dynamicPhotoPath, setDynamicPhotoPath] = useState(
    `/ProfileImages/${user?.photo}`
  );
  const { booked } = usebookedAppointment();
  const { mutate: reject } = useReject();
  const { doctors: lecturers } = uselecturersprofile();
  const { mutate: doctorReg } = useDoctorRegister();
  const { mutate: deleteAcc } = useDeleteAcc();
  const { mutate: add } = useAddFile();
  const [imageSrc, setImageSrc] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [newLecturerEmail, setNewLecturerEmail] = useState("");
  const [newLecturerPassword, setNewLecturerPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");
  const fileInputRef = useRef(null);
  const [filteredLecturers, setFilteredLecturers] = React.useState(lecturers);
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const { mutate: uploadPhoto } = usechangePhoto();

  const handleAddLecturer = (event) => {
    event.preventDefault();
    const form = event.target; // Get the form element
    const data = new FormData(form);
    const name = data.get("name");
    const reg_no = data.get("reg_no");
    const email = data.get("email");
    const password = data.get("password");
    const password_confirmation = data.get("password_confirmation");
    doctorReg({ name, reg_no, email, password, password_confirmation });

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

  const handleImageChange = (event) => {
    const photo = event.target.files[0];
    if (photo) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
        setDynamicPhotoPath(reader.result);
        uploadImage(photo);
      };
      reader.readAsDataURL(photo);
    }
  };

  const uploadImage = (photo) => {
    const formData = new FormData();
    formData.append("photo", photo);
    console.log("FormData:", formData);
    setContentType("multipart/form-data");
    uploadPhoto(formData);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteLecture = (event, id) => {
    event.preventDefault();
    deleteAcc({ id });
  };

  const handelRejectApp = (event, id) => {
    event.preventDefault();
    reject({ id });
  };

  const [file, setFile] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleAdd = (event) => {
    event.preventDefault();

    const formData = new FormData();
    if (file) {
      formData.append("file", file);
      add(formData);
    }

    setContentType("multipart/form-data");
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
                padding: "20px",
              }}
            >
              <Box
                style={{
                  width: "300px",
                  border: "1px solid lightgray",
                  height: "200px",
                  padding: "30px",
                  borderRadius: "10px",
                  display: "flex",
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
                padding: "10px",
                marginTop: "10px",
              }}
            >
              <Box
                style={{
                  width: "100%",
                  border: "1px solid lightgray",
                  height: "auto",
                  padding: "30px",
                  borderRadius: "10px",
                  marginTop: "10px",
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
                  Booked appointments
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
                          <TableCell>Appointment Name</TableCell>
                          <TableCell>Day</TableCell>
                          <TableCell>Start At</TableCell>
                          <TableCell>End At</TableCell>
                          <TableCell>Student Name</TableCell>

                          <TableCell>Reason</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {booked?.map((book, index) => (
                          <TableRow key={`${book.id}-${index}`}>
                            <TableCell>{booked[index]?.app_name}</TableCell>
                            <TableCell>{booked[index]?.day}</TableCell>
                            <TableCell>{booked[index]?.start_time}</TableCell>
                            <TableCell>{booked[index]?.end_time}</TableCell>

                            <TableCell>{booked[index]?.student_name}</TableCell>
                            <TableCell>{booked[index]?.reason}</TableCell>
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
                  <Tab
                    label="Delete Lecturers"
                    icon={<DeleteIcon />}
                    sx={{
                      marginLeft: "250px ", // Adjust the margin value as needed
                    }}
                  />
                  <Tab
                    label="Add Students Data"
                    icon={<AddIcon />}
                    sx={{
                      marginLeft: "250px ", // Adjust the margin value as needed
                    }}
                  />
                </Tabs>
                {selectedTab === 0 && (
                  <div>
                    <Box
                      component="form"
                      noValidate
                      onSubmit={handleAddLecturer}
                      style={{
                        marginTop: "10px",
                        border: "1px solid #ccc",
                        width: "50%",
                        height: "50%",
                        padding: "20px",
                        borderRadius: "10px",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
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
                        type="submit"
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
                        width: "70%",
                        height: "100%",
                        padding: "20px",
                        borderRadius: "10px",
                        flexDirection: "column",
                        marginLeft: "15%",
                      }}
                    >
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
                            {lecturers?.map((lecture, index) => (
                              <TableRow key={`${lecture.id}-${index}`}>
                                <TableCell>{lecturers[index]?.id}</TableCell>
                                <TableCell>{lecturers[index]?.name}</TableCell>
                                <TableCell>
                                  {lecturers[index]?.education_level}
                                </TableCell>
                                <TableCell>
                                  {lecturers[index]?.phone_no}
                                </TableCell>
                                <TableCell>
                                  <IconButton
                                    style={{ color: "#1f3f66" }}
                                    onClick={(event) =>
                                      handleDeleteLecture(event, lecture?.id)
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

                {selectedTab === 2 && (
                  <div>
                    <Box
                      component="form"
                      style={{
                        marginTop: "10px",
                        border: "1px solid #ccc",
                        width: "300px",
                        height: "100px",
                        padding: "20px",
                        borderRadius: "10px",
                        flexDirection: "column",
                        marginLeft: "70%",
                      }}
                    >
                      <div>
                        <input
                          type="file"
                          accept=".xls, .xlsx"
                          onChange={handleFileChange}
                        />

                        <Button
                          variant="contained"
                          component="label"
                          type="submit"
                          style={{
                            width: "90px",
                            marginTop: "40px",
                            marginLeft: "40%",
                            marginBottom: "5px",
                            background: "#1f3f66",
                          }}
                          onClick={handleAdd}
                        >
                          Add
                        </Button>
                      </div>
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
              marginLeft: "40px",
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
                marginLeft: "20px",
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
