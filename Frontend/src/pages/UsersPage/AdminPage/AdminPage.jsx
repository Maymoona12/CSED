import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  TextField,
  Container,
  Card,
  CardContent,
  CardActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const AdminPage = () => {
  const [lectures, setLectures] = useState([
    { email: 'Thear@example.com', password: 'TH@1235' },
    { email: 'Yazeed@example.com', password: 'YA@9875' },
  ]);
  const [newLecture, setNewLecture] = useState({ email: '', password: '' });
  const [isStudentFormVisible, setStudentFormVisible] = useState(false);
  const [isLecturerFormVisible, setLecturerFormVisible] = useState(false);

  const handleLogout = () => {
    // Add your logout logic here
  };

  const handleStudentFileUpload = (e) => {
    // Add logic for student file upload
  };

  const handleAddLecture = () => {
    setLectures([...lectures, newLecture]);
    setNewLecture({ email: '', password: '' });
  };

  const handleDeleteLecture = (index) => {
    const updatedLectures = [...lectures];
    updatedLectures.splice(index, 1);
    setLectures(updatedLectures);
  };

  const toggleStudentForm = () => {
    setStudentFormVisible(!isStudentFormVisible);
  };

  const toggleLecturerForm = () => {
    setLecturerFormVisible(!isLecturerFormVisible);
  };

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
      <Container sx={{ marginTop: 12, display: 'flex', gap: '20px' }}>
        <Card sx={{ flex: 1, minWidth: '300px' }} onClick={toggleStudentForm}>
          <CardContent>
            <Typography variant="h6">STUDENT</Typography>
            {/* Form for uploading Excel file for students */}
            {isStudentFormVisible && (
              <form encType="multipart/form-data" onSubmit={handleStudentFileUpload}>
                <Typography variant="h6" gutterBottom>
                  Upload Excel File for Students
                </Typography>
                <input type="file" name="studentFile" accept=".xlsx, .xls" />
                <Button type="submit" variant="contained" color="primary">
                  Upload
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        <Card sx={{ flex: 1, minWidth: '300px' }} onClick={toggleLecturerForm}>
          <CardContent>
            <Typography variant="h6">LECTURERS</Typography>
            {/* Form for managing lectures */}
            {isLecturerFormVisible && (
              <form>
                <Typography variant="h6" gutterBottom>
                  Manage Lectures
                </Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Email</TableCell>
                        <TableCell>Password</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {lectures.map((lecture, index) => (
                        <TableRow key={index}>
                          <TableCell>{lecture.email}</TableCell>
                          <TableCell>{lecture.password}</TableCell>
                          <TableCell>
                            <IconButton
                              color="priamery"
                              onClick={() => handleDeleteLecture(index)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                {isLecturerFormVisible && (
                  <>
                    <TextField
                      label="Email"
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      value={newLecture.email}
                      onChange={(e) => setNewLecture({ ...newLecture, email: e.target.value })}
                    />
                    <TextField
                      label="Password"
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      value={newLecture.password}
                      onChange={(e) =>
                        setNewLecture({ ...newLecture, password: e.target.value })
                      }
                    />
                    <Button variant="contained" color="primary" onClick={handleAddLecture}>
                      Add New Lecture
                    </Button>
                  </>
                )}
              </form>
            )}
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default AdminPage;
