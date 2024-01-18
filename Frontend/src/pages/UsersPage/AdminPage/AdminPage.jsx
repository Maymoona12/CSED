import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputAdornment,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import "./style.css"; // Import the external stylesheet

const AdminPage = () => {
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
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [newLecturerEmail, setNewLecturerEmail] = useState("");
  const [newLecturerPassword, setNewLecturerPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogout = () => {
    // Add your logout logic here
  };

  const handleAddNewLecturers = () => {
    setNewLecturerEmail("");
    setNewLecturerPassword("");
    setAddDialogOpen(true);
  };

  const handleAddLecturer = () => {
    // Handle logic for adding a new lecturer using newLecturerEmail and newLecturerPassword
    // For now, just log the values to the console
    console.log("Email:", newLecturerEmail);
    console.log("Password:", newLecturerPassword);
    setAddDialogOpen(false);
  };

  const handleDeleteLecture = (lectureId) => {
    // Remove the selected lecture from the state
    setLectures((prevLectures) =>
      prevLectures.filter((lecture) => lecture.id !== lectureId)
    );
  };

  const handleCloseAddDialog = () => {
    setAddDialogOpen(false);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  // Function to filter lectures by name
  const filteredLectures = lectures.filter((lecture) =>
    lecture.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Container
        sx={{
          marginTop: 12,
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
        }}
      >
        <div>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddNewLecturers}
            style={{ color: "black" }}
          >
            Add New Lecturers
          </Button>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<DeleteIcon />}
            onClick={() => setDeleteDialogOpen(true)}
            sx={{ marginLeft: 2, color: "black" }}
          >
            Delete Lecturers
          </Button>
        </div>

        {/* Dialog for adding new lecturers */}
        <Dialog open={isAddDialogOpen} onClose={handleCloseAddDialog}>
          <DialogTitle style={{ color: "black" }}>
            Add New Lecturers
          </DialogTitle>
          <DialogContent>
            {/* Form with email and password fields */}
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={newLecturerEmail}
              onChange={(e) => setNewLecturerEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              margin="normal"
              value={newLecturerPassword}
              onChange={(e) => setNewLecturerPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {showPassword ? (
                      <IconButton
                        onClick={() => setShowPassword(false)}
                        edge="end"
                      >
                        <VisibilityIcon />
                      </IconButton>
                    ) : (
                      <IconButton
                        onClick={() => setShowPassword(true)}
                        edge="end"
                      >
                        <VisibilityOffIcon />
                      </IconButton>
                    )}
                  </InputAdornment>
                ),
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAddDialog} style={{ color: "black" }}>
              Cancel
            </Button>
            <Button onClick={handleAddLecturer} style={{ color: "black" }}>
              Add
            </Button>
          </DialogActions>
        </Dialog>

        {/* Dialog for deleting lecturers */}
        <Dialog open={isDeleteDialogOpen} onClose={handleCloseDeleteDialog}>
          <DialogTitle style={{ color: "black" }}>
            Delete Lecturers
            <TextField
              sx={{ marginLeft: 10 }}
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter lecturer's name"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </DialogTitle>
          <DialogContent>
            {/* Add your form with a table for displaying and deleting lecturers here */}
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
                          style={{ color: "black" }}
                          onClick={() => handleDeleteLecture(lecture.id)}
                        >
                          <ClearIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseDeleteDialog}
              style={{ color: "black" }}
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
};

export default AdminPage;
