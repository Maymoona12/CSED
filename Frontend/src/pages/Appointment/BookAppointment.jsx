import React, { useState } from "react";
import {
  Button,
  Typography,
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
import AddCircleIcon from "@mui/icons-material/AddCircle";
import useBookAppointment from "./useBookAppointmet";

const BookAppointment = () => {
  const { book } = useBookAppointment();
  const [bookedAppointments, setBookedAppointments] = useState(book || []);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

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
      <div style={{ marginTop: "10px", padding: "20px" }}>
        <Typography
          variant="h4"
          component="div"
          gutterBottom
          style={{ fontFamily: "Garamond" }}
        >
          Book An Appointments
        </Typography>

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
                <TableRow key={`${appointment.id}-${index}`}>
                  <TableCell>{appointment.day}</TableCell>
                  <TableCell>{appointment.name}</TableCell>
                  <TableCell>{appointment.start_time}</TableCell>
                  <TableCell>{appointment.end_time}</TableCell>
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
