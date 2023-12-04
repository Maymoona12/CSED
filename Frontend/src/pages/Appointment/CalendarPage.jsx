import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { AppBar, Toolbar, Typography, Button, Card, CardContent, TextField } from "@mui/material";

const localizer = momentLocalizer(moment);

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const CalendarPage = () => {
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    subject: "",
    name: "",
    course: "",
    phoneNumber: "",
    email: "",
  });

  const [schedule, setSchedule] = useState([
    {
      day: "2023-12-01",
      appointments: [
        { name: "Meeting 1", startTime: "09:00", endTime: "10:30", color: getRandomColor() },
        { name: "Meeting 2", startTime: "14:00", endTime: "15:30", color: getRandomColor() },
        { name: "Meeting 1", startTime: "08:00", endTime: "9:30", color: getRandomColor() },
        { name: "Meeting 2", startTime: "13:00", endTime: "13:30", color: getRandomColor() },
      ],
    },
    {
      day: "2023-12-02",
      appointments: [
        { name: "Meeting 3", startTime: "11:00", endTime: "12:30", color: getRandomColor() },
        { name: "Meeting 4", startTime: "16:00", endTime: "17:30", color: getRandomColor() },
      ],
    },
  ]);

  const events = schedule.reduce((acc, day) => {
    if (Array.isArray(day.appointments)) {
      day.appointments.forEach((appointment) => {
        const startDateTime = moment(`${day.day} ${appointment.startTime}`, "YYYY-MM-DD HH:mm");
        const endDateTime = moment(`${day.day} ${appointment.endTime}`, "YYYY-MM-DD HH:mm");

        const isDisabled = selectedMeeting && selectedMeeting.title === appointment.name;

        acc.push({
          title: appointment.name,
          start: startDateTime.toDate(),
          end: endDateTime.toDate(),
          color: appointment.color,
          isDisabled,
        });
      });
    }

    return acc;
  }, []);

  useEffect(() => {
    // Code to run when the component mounts or when selectedMeeting changes
    // For example, you can fetch data here or perform other side effects
  }, [selectedMeeting]);

  const handleLogout = () => {
    // Define your logout logic here
    console.log("Logout clicked");
  };

  const handleSelectEvent = (event) => {
    if (!event.isDisabled) {
      setSelectedMeeting(event);
      setBookingDetails({
        subject: "",
        name: "",
        course: "",
        phoneNumber: "",
        email: "",
      });
    }
  };

  const handleConfirmBooking = () => {
    if (selectedMeeting && !selectedMeeting.isDisabled) {
      console.log("Meeting confirmed:", selectedMeeting.title);
      console.log("Booking Details:", bookingDetails);
      setSelectedMeeting(null);
    }
  };

  const handleCancelBooking = () => {
    console.log("Booking canceled");
    setSelectedMeeting(null);
  };

  const handleInputChange = (field, value) => {
    setBookingDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  return (
    <div style={{ display: "flex", marginBottom: "20px" }}>
      <div style={{ flex: 1 }}>
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
        <div>
          <div style={{ display: "flex", flexWrap: "wrap", marginTop: "50px", marginLeft: "10px" }}>
            <h1 style={{ color: "black", fontFamily: "Garamond" }}>Calendar Page</h1>
          </div>
        </div>
        <div style={{ padding: "15px"}}>
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
      {selectedMeeting && (
        <Card style={{ marginLeft: "20px", width: "300px", height: "100%", marginTop: "195px"}}>
          <CardContent>
            <Typography variant="h6" gutterBottom style={{ color: "black", fontFamily: "Garamond" }}>
              Confirm Booking
            </Typography>
            <TextField
              label="Subject"
              fullWidth
              margin="normal"
              value={bookingDetails.subject}
              onChange={(e) => handleInputChange("subject", e.target.value)}
            />
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              value={bookingDetails.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
            <TextField
              label="Course"
              fullWidth
              margin="normal"
              value={bookingDetails.course}
              onChange={(e) => handleInputChange("course", e.target.value)}
            />
            <TextField
              label="Phone Number"
              fullWidth
              margin="normal"
              value={bookingDetails.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
            />
            <TextField
              label="Email Address"
              fullWidth
              margin="normal"
              value={bookingDetails.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
            <Button onClick={handleConfirmBooking} color="primary" variant="contained" style={{marginTop: "25px", marginRight: "75px" }}>
              Confirm
            </Button>
            <Button onClick={handleCancelBooking} color="grey" variant="contained" style={{marginTop: "25px"}}>
              Cancel
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CalendarPage;
