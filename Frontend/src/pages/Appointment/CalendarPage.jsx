import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
  Modal, // Import Modal from @mui/material
} from "@mui/material";

const localizer = momentLocalizer(moment);

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const CalendarPage = ({ schedule }) => {
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    subject: "",
  });
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false); // Added state for modal

  const events = schedule.reduce((acc, day) => {
    if (Array.isArray(day.appointments)) {
      day.appointments.forEach((appointment) => {
        const startDateTime = moment(`${day.day} ${appointment.startTime}`, "ddd HH:mm");
        const endDateTime = moment(`${day.day} ${appointment.endTime}`, "ddd HH:mm");

        const isDisabled = selectedMeeting && selectedMeeting.title === appointment.name;

        acc.push({
          title: appointment.name,
          start: startDateTime.toDate(),
          end: endDateTime.toDate(),
          backgroundColor: getRandomColor(),
          isDisabled,
        });
      });
    }

    return acc;
  }, []);

  const handleLogout = () => {
    console.log("Logout clicked");
    // Implement your logout logic here
  };

  const handleSelectEvent = (event) => {
    if (!event.isDisabled) {
      setSelectedMeeting(event);
      setBookingDetails({
        subject: "",
      });
      setConfirmationModalOpen(true); // Open the confirmation modal
    }
  };

  const handleConfirmBooking = () => {
    if (selectedMeeting && !selectedMeeting.isDisabled && bookingDetails.subject.trim() !== "") {
      console.log("Meeting confirmed:", selectedMeeting.title);
      console.log("Booking Details:", bookingDetails);
      setSelectedMeeting(null);
      setConfirmationModalOpen(false); // Close the confirmation modal
    }
  };

  const handleCancelBooking = () => {
    console.log("Booking canceled");
    setSelectedMeeting(null);
    setConfirmationModalOpen(false); // Close the confirmation modal
  };

  const handleInputChange = (field, value) => {
    setBookingDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  return (
    <div style={{ display: "flex", marginBottom: "20px" }}>
      {/* Left Section */}
      <div style={{ flex: 1 }}>
        {/* App Bar */}
        <AppBar position="static" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000 }} sx={{ background: "black" }}>
          <Toolbar>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontFamily: "Brush Script MT" }}>
              CSED
            </Typography>
            <Button onClick={handleLogout} className="logout__btn" color="inherit" sx={{ color: "white" }}>
              Log out
            </Button>
          </Toolbar>
        </AppBar>

        {/* Header */}
        <div>
          <div style={{ display: "flex", flexWrap: "wrap", marginTop: "50px", marginLeft: "10px" }}>
            <h1 style={{ color: "black", fontFamily: "Garamond" }}>Calendar Page</h1>
          </div>
        </div>

        {/* Calendar */}
        <div style={{ padding: "15px" }}>
          <Card style={{ width: "100%", height: "100%" }}>
            <CardContent>
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 580 }}
                onSelectEvent={handleSelectEvent}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Section */}
      {selectedMeeting && (
        <Modal open={confirmationModalOpen} onClose={() => setConfirmationModalOpen(false)}>
          <Card style={{ margin: "20px", width: "300px", height: "100%" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom style={{ color: "black", fontFamily: "Garamond" }}>
                Confirm Booking
              </Typography>
              <div style={{ display: "flex", marginBottom: "20px" }}>
                <TextField
                  label="Subject"
                  multiline
                  minRows={3}
                  placeholder="Write the reason for your meeting here... with section and course"
                  value={bookingDetails.subject}
                  onChange={(e) => handleInputChange("subject", e.target.value)}
                  style={{
                    width: "100%",
                    marginTop: "8px",
                  }}
                  required
                />
              </div>
              <Button
                onClick={handleConfirmBooking}
                color="primary"
                variant="contained"
                style={{ marginTop: "25px", marginRight: "75px" }}
                disabled={!bookingDetails.subject.trim()}
              >
                Confirm
              </Button>
              <Button onClick={handleCancelBooking} color="grey" variant="contained" style={{ marginTop: "25px" }}>
                Cancel
              </Button>
            </CardContent>
          </Card>
        </Modal>
      )}
    </div>
  );
};

export default CalendarPage;
