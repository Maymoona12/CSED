import React, { useState, useRef } from "react";
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
import useBookAppointment from "../../useBookAppointmet";
import { useParams } from "react-router-dom";
import useReason from "../../useReason";
import useAuth from "../../../../hooks/useAuth";

const BookAppointment = () => {
  const { getUser } = useAuth();
  const formRef = useRef(null);
  const { id } = useParams();
  const { book } = useBookAppointment(id);
  const { mutate } = useReason();
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleBookNow = (id) => {
    console.log("Selected Appointment ID:", id);

    setSelectedAppointment(id);
    setDialogOpen(true);
  };

  // const getLoggedInStudentId = () => {
  //   // Assuming you have an authentication context or a user object
  //   const user = getUser(); // Replace with your actual function to get the current user
  //   return user ? user.id : null;
  // };

  const handleConfirmBooking = (event, id) => {
    event.preventDefault();

    // const student = getLoggedInStudentId();

    // if (!student) {
    //   // Handle the case where the student information is not available
    //   console.error("Student information not available.");
    //   return;
    // }

    const formElement = formRef.current;
    const formData = new FormData(formElement);
    const data = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    const { reason } = data;

    mutate({ reason, appointment_id: id });

    if (reason.trim() === "") {
      setAlertMessage("Please provide a reason for the booking.");
      setSnackbarOpen(true);
      return;
    }

    setDialogOpen(false);
    setSelectedAppointment(null);
    setReason("");
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
                <TableCell>Id</TableCell>
                <TableCell>Appointment Name</TableCell>
                <TableCell>Start Time</TableCell>
                <TableCell>End Time</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {book?.map((appointment, index) => (
                <TableRow key={`${appointment.id}-${index}`}>
                  <TableCell>{appointment?.day}</TableCell>
                  <TableCell>{appointment?.id}</TableCell>
                  <TableCell>{appointment?.app_name}</TableCell>
                  <TableCell>{appointment?.start_time}</TableCell>
                  <TableCell>{appointment?.end_time}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleBookNow(appointment.id)}
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
        <DialogTitle>{`Book Now`}</DialogTitle>
        <form
          ref={formRef}
          onSubmit={(event) => handleConfirmBooking(event, selectedAppointment)}
        >
          <DialogContent>
            <TextField
              label="Reason"
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              name="reason"
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter your reason here.. with section and name of course"
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={(event) =>
                handleConfirmBooking(event, selectedAppointment)
              }
              color="primary"
              variant="contained"
            >
              Confirm Booking
            </Button>
          </DialogActions>
        </form>
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
