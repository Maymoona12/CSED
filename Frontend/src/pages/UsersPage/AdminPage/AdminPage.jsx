import React, { useState } from 'react';
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
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import './style.css'; // Import the external stylesheet

const AdminPage = () => {
  const [lectures, setLectures] = useState([
    { id: 1, name: 'Thear sammar', assistant: 'PROF', phone: '123-456-7890' },
    { id: 2, name: 'Yazeed Sleet', assistant: 'Lecturer', phone: '987-654-3210' },
    { id: 3, name: 'Anas Melhem', assistant: 'PROF', phone: '123-456-7890' },
    { id: 4, name: 'Nagham Hammad', assistant: 'Lecturer', phone: '987-654-3210' },
  ]);
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    // Add your logout logic here
  };

  const handleAddNewLecturers = () => {
    setAddDialogOpen(true);
  };

  const handleDeleteLecture = (lectureId) => {
    // Placeholder for delete logic
    console.log(`Deleting lecture with ID: ${lectureId}`);
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
      <AppBar
        position="static"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
        }}
        sx={{ background: 'black' }}
      >
        <Toolbar>
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, fontFamily: 'Brush Script MT' }}
          >
            CSED
          </Typography>
          <Button
            onClick={handleLogout}
            className="logout__btn"
            color="inherit"
            sx={{ color: 'white' }}
          >
            Log out
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ marginTop: 12, display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
        <div>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddNewLecturers}
          >
            Add New Lecturers
          </Button>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<DeleteIcon />}
            onClick={() => setDeleteDialogOpen(true)}
            sx={{ marginLeft: 2 }}
          >
            Delete Lecturers
          </Button>
        </div>

        {/* Dialog for adding new lecturers */}
        <Dialog open={isAddDialogOpen} onClose={handleCloseAddDialog}>
          <DialogTitle>Add New Lecturers</DialogTitle>
          <DialogContent>
            {/* Add your form for uploading Excel file for new lecturers here */}
            {/* Example input for file upload */}
            <TextField
              type="file"
              variant="outlined"
              fullWidth
              margin="dense"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAddDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleCloseAddDialog} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>

        {/* Dialog for deleting lecturers */}
        <Dialog open={isDeleteDialogOpen} onClose={handleCloseDeleteDialog}>
          <DialogTitle>
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
                    <TableCell>Action</TableCell>
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
                          color="primary"
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
            <Button onClick={handleCloseDeleteDialog} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
};

export default AdminPage;
