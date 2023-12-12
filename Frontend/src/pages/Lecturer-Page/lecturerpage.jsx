import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Avatar,
  Typography,
  Box,
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import ListItemIcon from "@mui/material/ListItemIcon";

const LecturerPage = () => {
  const initialData = {
    assistant: "Initial Assistant",
    roomNumber: "Initial Room Number",
    phone: "Initial Phone",
    email: "Initial Email",
  };

  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState(initialData);

  const lecturers = [
    {
      name: "Dr.Thaer Samar",
      photoUrl: "ProfileImages/thaer.PNG",
      information:
        "Assistant Professor\nRoom Number: H313\n+970 9 2688199\nthaer.sammar@ptuk.edu.ps",
    },
  ];

  const handleEditButtonClick = () => {
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

  const setInitialData = (data) => {
    // Logic to update your initial data, e.g., save to database
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

  return (
    <div
      style={{
        marginBottom: "20px",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
      }}
    >
      {/* Left column for profile information */}
      <div>
        <AppBar
          position="static"
          style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000 }}
          sx={{ background: "black" }}
        >
          <Toolbar>
            <Typography
              variant="h5"
              component="div"
              sx={{ flexGrow: 1, fontFamily: "Brush Script MT" }}
            >
              CSED
            </Typography>
          </Toolbar>
        </AppBar>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginTop: "100px",
          }}
        >
          <Avatar
            alt={lecturers[0].name}
            src={lecturers[0].photoUrl}
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
              {lecturers[0].name}
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
              variant="h6"
              style={{ marginBottom: "20px", color: "black" }} // Increased marginBottom
            >
              User Details
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              style={{ color: "black", marginBottom: "20px" }} // Increased marginBottom
            >
              {lecturers[0].information.split("\n").map((line, i) => (
                <div key={i}>
                  <div style={{ display: "flex", marginBottom: "20px" }}>
                    <ListItemIcon style={{ color: "black" }}>
                      {i === 0 && <AccountBalanceIcon />}
                      {i === 1 && <ApartmentIcon />}
                      {i === 2 && <PhoneIcon />}
                      {i === 3 && <EmailIcon />}
                    </ListItemIcon>
                    {i === 3 ? (
                      <a href={`mailto:${line}`} style={{ color: "black" }}>
                        {line}
                      </a>
                    ) : (
                      <span style={{ color: "black" }}>{line}</span>
                    )}
                  </div>
                </div>
              ))}
            </Typography>
            <div style={{ marginTop: "30px" }}>
              {/* Increased marginTop */}
              <button onClick={handleEditButtonClick}>
                {editMode ? "Save Changes" : "Edit Profile"}
              </button>
              {editMode && (
                <button
                  onClick={() => setEditMode(false)}
                  style={{ marginLeft: "20px" }}
                >
                  Cancel
                </button>
              )}
            </div>
          </Box>
        </div>
      </div>

      {/* Additional content (new box) */}
      {editMode && (
        <Box
          style={{
            border: "1px solid #ddd",
            padding: "30px",
            borderRadius: "20px",
            marginLeft: "20px",
            marginTop: "200px",
            width: "300px",
            height: "300px",
          }}
        >
          <Typography
            variant="h6"
            style={{ marginBottom: "8px", color: "black" }}
          >
            Edit Profile
          </Typography>
          <TableContainer style={{ marginTop: "20px" }}>
            <Table style={{ border: "1px solid black" }}>
              <TableBody>
                <TableRow>
                  <TableCell style={{ borderBottom: "1px solid black" }}>
                    Assistant:
                  </TableCell>
                  <TableCell style={{ borderBottom: "1px solid black" }}>
                    <input
                      type="text"
                      placeholder="Assistant"
                      value={editedData.assistant}
                      onChange={(e) =>
                        handleChange("assistant", e.target.value)
                      }
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ borderBottom: "1px solid black" }}>
                    Room Number:
                  </TableCell>
                  <TableCell style={{ borderBottom: "1px solid black" }}>
                    <input
                      type="text"
                      placeholder="Room Number"
                      value={editedData.roomNumber}
                      onChange={(e) =>
                        handleChange("roomNumber", e.target.value)
                      }
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ borderBottom: "1px solid black" }}>
                    Phone:
                  </TableCell>
                  <TableCell style={{ borderBottom: "1px solid black" }}>
                    <input
                      type="text"
                      placeholder="Phone"
                      value={editedData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ borderBottom: "1px solid black" }}>
                    Email:
                  </TableCell>
                  <TableCell style={{ borderBottom: "1px solid black" }}>
                    <input
                      type="text"
                      placeholder="Email"
                      value={editedData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          {/* <div style={{ marginTop: "20px" }}>
            <button onClick={handleEditButtonClick}>Save Changes</button>
            <button
              onClick={() => setEditMode(false)}
              style={{ marginLeft: "20px" }}
            >
              Cancel
            </button>
          </div> */}
        </Box>
      )}
    </div>
  );
};

export default LecturerPage;
