import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { AppBar, Toolbar, Typography, Button } from "@mui/material"; // Import Material-UI components

const localizer = momentLocalizer(moment);

const CalendarPage = ({ schedule }) => {
  if (typeof schedule === 'undefined' || !Array.isArray(schedule)) {
    console.error("Invalid schedule prop:", schedule);
    return null; // or display an error message
  }

  const events = schedule.reduce((acc, day) => {
    if (Array.isArray(day.appointments)) {
      day.appointments.forEach((appointment) => {
        const startDateTime = moment(`${day.day} ${appointment.startTime}`, "ddd HH:mm");
        const endDateTime = moment(`${day.day} ${appointment.endTime}`, "ddd HH:mm");

        acc.push({
          title: appointment.name,
          start: startDateTime.toDate(),
          end: endDateTime.toDate(),
        });
      });
    }

    return acc;
  }, []);

  const handleLogout = () => {
    // Define your logout logic here
    console.log("Logout clicked");
  };

  return (
    <div style={{ marginBottom: "20px" }}>
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
        <div style={{ padding: "20px" }}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
