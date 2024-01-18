import React, { useState } from "react";
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
  const [editMode, setEditMode] = useState(false);

  const [education_level, setEducation_level] = useState(
    user?.education_level || ""
  );
  const [office_no, setOffice_no] = useState(user?.office_no || "");
  const [phone_no, setPhone_no] = useState(user?.phone_no || "");
  const [email, setEmail] = useState(user?.email || "");

  const handleEducation_level = (e) => {
    setEducation_level(e.target.value);
  };
  const handlePhone_no = (e) => {
    setPhone_no(e.target.value);
  };
  const handleOffice_no = (e) => {
    setOffice_no(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleEditButtonClick = (event) => {
    if (editMode) {
      // Save the changes when leaving edit mode
      setEditMode(false);
      // Save the changes to your database or perform any other necessary actions
    } else {
      // Enter edit mode and pre-fill the input fields with the initialData
      setEditMode(true);
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
            alt={user?.name}
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
              height:"350px",
              padding: "30px",
              borderRadius: "20px",
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
                paddingTop: "20px ",
                paddingBottom: "10px",
              }}
            >
              User Details
            </Typography>

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
                Edit Profile
              </button>
            </div>
          </Box>

          {editMode && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "30px",
                padding: "30px",
              }}
            >
              <Box
                id="editform"
                component="form"
                noValidate
                onSubmit={handelSubmit}
                sx={{
                  mt: -2,
                  width: "330px",
                  border: "1px solid #ddd",
                  padding: "50px",
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
                  Information to edit
                </Typography>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="education_level"
                  name="education_level"
                  label="Education Level"
                  type="text"
                  value={education_level}
                  onChange={handleEducation_level}
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="office_no"
                  label="Office Room"
                  type="text"
                  id="office_no"
                  autoComplete="office_no"
                  value={office_no}
                  onChange={handleOffice_no}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="phone_no"
                  label="Phone"
                  type="text"
                  id="phone_no"
                  autoComplete="phone_no"
                  value={phone_no}
                  onChange={handlePhone_no}
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
                  value={email}
                  onChange={handleEmailChange}
                />
                <div style={{ display: "flex", gap: "10px" }}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 4,
                      mb: 3,
                      background: "black",
                      "&:hover": {
                        background: "black",
                      },
                    }}
                  >
                    Save Changes
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 4,
                      mb: 3,
                      background: "grey",
                      "&:hover": {
                        background: "grey",
                      },
                      padding: "10px",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                    onClick={() => setEditMode(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </Box>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
