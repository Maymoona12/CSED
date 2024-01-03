import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const BookAppointment = () => {
  const navigate = useNavigate();
  const [bookedAppointments, setBookedAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // Retrieve data from localStorage on component mount
  useEffect(() => {
    const storedAppointments = localStorage.getItem("BookAppointments");
    const parsedAppointments = JSON.parse(storedAppointments);
    setBookedAppointments(parsedAppointments || []);
  }, []);

  const addSampleData = () => {
    // Replace this with your actual data or logic
    const sampleData = [
      {
        day: "Monday",
        name: "office hours",
        startTime: "09:30 AM",
        endTime: "10:00 AM",
      },
      {
        day: "Monday",
        name: "office hours",
        startTime: "10:00 AM",
        endTime: "10:30 AM",
      },
      {
        day: "Tuesday",
        name: "office hours",
        startTime: "02:00 PM",
        endTime: "02:20 PM",
      },
      {
        day: "Tuesday",
        name: "office hours",
        startTime: "02:20 PM",
        endTime: "02:40 PM",
      },
      {
        day: "Tuesday",
        name: "office hours",
        startTime: "02:40 PM",
        endTime: "03:00 PM",
      },
      // Add more sample data as needed
    ];

    // Update the state with the sample data
    setBookedAppointments(sampleData);

    // Save the sample data to localStorage
    localStorage.setItem("BookAppointments", JSON.stringify(sampleData));
  };

  const handleBookNow = (appointment) => {
    setSelectedAppointment(appointment);
    setDialogOpen(true);
  };

  const handleConfirmBooking = () => {
    // Check if the reason is not empty before confirming the booking
    if (reason.trim() === "") {
      setAlertMessage("Please provide a reason for the booking.");
      setSnackbarOpen(true);
      return;
    }

    // Add your logic for handling the booking confirmation
    // You can save the booking details or perform any other actions here
    setDialogOpen(false);
    setSelectedAppointment(null);
    setReason(""); // Clear the reason field
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedAppointment(null);
    setReason(""); // Clear the reason field
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setAlertMessage("");
  };

  return (
    <div>
      <div style={{ marginTop: "80px", padding: "20px" }}>
        <Typography
          variant="h4"
          component="div"
          gutterBottom
          style={{ fontFamily: "Garamond" }}
        >
          Book An Appointments
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={addSampleData}
          style={{ marginBottom: "10px" }}
        >
          Add Sample Data
        </Button>
        <TableContainer
          style={{
            border: "1px solid #ddd",
            padding: "5px",
            borderRadius: "10px",
            width: "650px",
            height: "auto",
            display: "fixed",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Day</TableCell>
                <TableCell>Appointment</TableCell>
                <TableCell>Start Time</TableCell>
                <TableCell>End Time</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookedAppointments.map((appointment, index) => (
                <TableRow key={index}>
                  <TableCell>{appointment.day}</TableCell>
                  <TableCell>{appointment.name}</TableCell>
                  <TableCell>{appointment.startTime}</TableCell>
                  <TableCell>{appointment.endTime}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleBookNow(appointment)}
                      color="primary"
                    >
                      <AddCircleIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* Dialog for booking */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>{`Book Now - ${selectedAppointment?.name}`}</DialogTitle>
        <DialogContent>
          <TextField
            label="Reason"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter your reason here.. with section and name of course"
            required // Adding the required attribute
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmBooking}
            color="primary"
            variant="contained"
          >
            Confirm Booking
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for displaying alerts */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default BookAppointment;
