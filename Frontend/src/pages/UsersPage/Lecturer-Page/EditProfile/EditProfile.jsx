import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, Typography } from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import ListItemIcon from "@mui/material/ListItemIcon";
import useAuth from "../../../../hooks/useAuth";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import useEditProfile from "./useEditProfile";

const EditProfile = () => {
  const { getUser } = useAuth();
  const user = getUser();
  const { mutate } = useEditProfile();

  const initialData = {
    assistant: "Initial Assistant",
    roomNumber: "Initial Room Number",
    phone: "Initial Phone",
    email: "Initial Email",
  };

  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState(initialData);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const lecturers = [
    {
      name: "Dr.Thaer Samar",
      photoUrl: "ProfileImages/thaer.png",
      information:
        "Assistant Professor\nRoom Number: H313\n+970 9 2688199\nthaer.sammar@ptuk.edu.ps",
    },
  ];

  const handleEditButtonClick = (event) => {
    if (editMode) {
      // Save the changes when leaving edit mode
      setEditMode(false);
      // Save the changes to your database or perform any other necessary actions
      // For now, let's just update the initialData with the edited values
      setInitialData(editedData);
    } else {
      // Enter edit mode and pre-fill the input fields with the initialData
      setEditMode(true);
      setEditedData(initialData);
    }
  };
  const handelSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const education_level = data.get("education_level");
    const office_no = data.get("office_no");
    const phone_no = data.get("phone_no");

    mutate({ email, education_level, office_no, phone_no });
  };
  const setInitialData = (data) => {
    // Logic to update your initial data, e.g., save to the database
    // For now, we just log it
    console.log("Saved changes:", data);
  };

  const handleChange = (field, value) => {
    // Update the editedData state
    setEditedData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div
      style={{
        marginBottom: "20px",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
      }}
    >
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Avatar
            alt={lecturers[0].name}
            src={user?.photo}
            sx={{
              width: 100,
              height: 100,
              marginRight: "20px",
              marginLeft: "40px",
            }}
          />
          <div>
            <Typography
              variant="h5"
              component="div"
              style={{ marginBottom: "8px", color: "black" }}
            >
              {user?.name}
            </Typography>
          </div>
        </div>
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
              border: "1px solid #ddd",
              padding: "30px",
              borderRadius: "20px",
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
              User Details
            </Typography>

            <div style={{ color: "black", marginBottom: "20px" }}>
              <div style={{ display: "flex", marginBottom: "20px" }}>
                <ListItemIcon style={{ color: "black" }}>
                  <AccountBalanceIcon />
                </ListItemIcon>
                <Typography style={{ marginRight: "7px" }}>
                  {user?.education_level}
                </Typography>
              </div>

              <div style={{ display: "flex", marginBottom: "20px" }}>
                <ListItemIcon style={{ color: "black" }}>
                  <ApartmentIcon />
                </ListItemIcon>
                <Typography style={{ marginRight: "7px" }}>
                  {user?.office_no}
                </Typography>
              </div>

              <div style={{ display: "flex", marginBottom: "20px" }}>
                <ListItemIcon style={{ color: "black" }}>
                  <PhoneIcon />
                </ListItemIcon>
                <Typography style={{ marginRight: "7px" }}>
                  {user?.phone_no}
                </Typography>
              </div>

              <div style={{ display: "flex", marginBottom: "20px" }}>
                <ListItemIcon style={{ color: "black" }}>
                  <EmailIcon />
                </ListItemIcon>
                <Typography style={{ marginRight: "7px" }}>
                  {user?.email}
                </Typography>
              </div>
            </div>

            <div style={{ marginTop: "30px", display: "flex", gap: "10px" }}>
              <button
                onClick={handleEditButtonClick}
                style={{
                  padding: "10px",
                  backgroundColor: "black",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                {editMode ? "Save Changes" : "Edit Profile"}
              </button>
              {editMode && (
                <button
                  onClick={() => setEditMode(false)}
                  style={{
                    padding: "10px",
                    backgroundColor: "grey",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </Box>

          {editMode && (
            <Box
              id="loginform"
              component="form"
              noValidate
              onSubmit={handleEditButtonClick}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="education_level"
                label="Education Level"
                name="education_level"
                autoComplete="education_level"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="office_no"
                label="Office Number"
                type="text"
                id="office_no"
                autoComplete="office_no"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="phone_no"
                label="Phone Number"
                type="text"
                id="phone_no"
                autoComplete="phone_no"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="email"
                label="Email"
                type="email"
                id="email"
                autoComplete="email"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  background: "black",
                  "&:hover": {
                    background: "black",
                  },
                }}
                onClick={handelSubmit}
              >
                Save Changes
              </Button>
            </Box>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
