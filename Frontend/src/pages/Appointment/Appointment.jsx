import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Link, useNavigate } from "react-router-dom";

const localizer = momentLocalizer(moment);

const CalendarPage = ({ schedule }) => {
  if (!schedule || !Array.isArray(schedule)) {
    console.error("Invalid schedule prop:", schedule);
    return null;
  }

  const events = schedule.reduce((acc, day) => {
    if (Array.isArray(day.appointments)) {
      day.appointments.forEach((appointment) => {
        const startDateTime = moment(
          `${day.day} ${appointment.startTime}`,
          "ddd HH:mm"
        );
        const endDateTime = moment(
          `${day.day} ${appointment.endTime}`,
          "ddd HH:mm"
        );

        acc.push({
          title: appointment.name,
          start: startDateTime.toDate(),
          end: endDateTime.toDate(),
        });
      });
    }

    return acc;
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Calendar Page</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

const Appointment = () => {
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [schedule, setSchedule] = useState([
    { day: "Sun", appointments: [] },
    { day: "Mon", appointments: [] },
    { day: "Tue", appointments: [] },
    { day: "Wed", appointments: [] },
    { day: "Thu", appointments: [] },
  ]);
  const [showCalendar, setShowCalendar] = useState(false);
  const navigate = useNavigate();

  const handleAddAppointment = (
    dayIndex,
    appointment,
    startTime,
    endTime,
    selectedDay
  ) => {
    const updatedSchedule = [...schedule];

    if (editingAppointment !== null) {
      updatedSchedule[dayIndex].appointments[editingAppointment].day =
        selectedDay;
      updatedSchedule[dayIndex].appointments[editingAppointment].name =
        appointment;
      updatedSchedule[dayIndex].appointments[editingAppointment].startTime =
        startTime;
      updatedSchedule[dayIndex].appointments[editingAppointment].endTime =
        endTime;
      setEditingAppointment(null);
    } else {
      updatedSchedule[dayIndex].appointments.push({
        day: selectedDay,
        name: appointment,
        startTime,
        endTime,
      });
    }

    setSchedule(updatedSchedule);

    document.getElementById(`appointment-${dayIndex}`).value = "";
    document.getElementById(`startTime-${dayIndex}`).value = "";
    document.getElementById(`endTime-${dayIndex}`).value = "";

    console.log("Data saved to state:", updatedSchedule);
  };

  const handleViewButtonClick = (dayIndex) => {
    const tableElement = document.getElementById(`table-${dayIndex}`);
    const isVisible = tableElement.style.display === "table";

    if (isVisible) {
      tableElement.style.display = "none";
    } else {
      tableElement.style.display = "table";
    }

    console.log(
      "Appointments for view button:",
      schedule[dayIndex].appointments
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("_id");
    localStorage.removeItem("_myEmail");
    navigate("/");
  };

  const handleEditAppointment = (dayIndex, appIndex) => {
    const appointmentToEdit = schedule[dayIndex].appointments[appIndex];
    document.getElementById(`day-0`).value = appointmentToEdit.day;
    document.getElementById(`appointment-0`).value = appointmentToEdit.name;
    document.getElementById(`startTime-0`).value = appointmentToEdit.startTime;
    document.getElementById(`endTime-0`).value = appointmentToEdit.endTime;
    setEditingAppointment(appIndex);
  };

  const handleDeleteAppointment = (dayIndex, appIndex) => {
    const updatedSchedule = [...schedule];
    updatedSchedule[dayIndex].appointments.splice(appIndex, 1);
    setSchedule(updatedSchedule);
  };

  const handleSaveButtonClick = (dayIndex) => {
    const tableElement = document.getElementById(`table-${dayIndex}`);
    if (
      tableElement.style.display === "table" &&
      tableElement.style.visibility === "visible"
    ) {
      console.log("Table saved:", schedule[dayIndex].appointments);
    }

    setShowCalendar(true);

    console.log("mySchedule:", schedule);
  };

  useEffect(() => {
    console.log("showCalendar:", showCalendar);
  }, [showCalendar]);

  return (
    <div
      style={{
        marginBottom: "20px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
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
            <Button
              onClick={handleLogout}
              className="logout__btn"
              color="inherit"
              sx={{ color: "white" }}
            >
              Log out
            </Button>
          </Toolbar>
        </AppBar>
        <div style={{ display: "flex", flexWrap: "wrap", marginLeft: "30px", marginTop: "60px" }}>
          <h1 style={{ color: "black", fontFamily: "Garamond" }}>
            Add Office Hours
          </h1>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "20px",
            minWidth: "200px",
            color: "black",
          }}
        >
          <Card
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginLeft: "6px",
              marginRight: "5px",
              padding: "10px",
              minWidth: "390px",
              height: "210px",
              border: "1px solid #ddd",
              borderRadius: "20px",
              color: "black",
            }}
          >
            <CardContent>
              <Typography gutterBottom>
                <label htmlFor={`day-0`} style={{ marginRight: "136px" }}>
                  {" "}
                  Day
                </label>
                <select id={`day-0`}>
                  <option value="Sun">Sunday</option>
                  <option value="Mon">Monday</option>
                  <option value="Tue">Tuesday</option>
                  <option value="Wed">Wednesday</option>
                  <option value="Thu">Thursday</option>
                </select>
              </Typography>
              <div className="select__wrapper">
                <label
                  htmlFor={`appointment-0`}
                  style={{ marginRight: "18px" }}
                >
                  Add/Edit Appointment
                </label>
                <input type="text" id={`appointment-0`} />

                <div className="select__wrapper" style={{ marginTop: "10px" }}>
                  <label
                    htmlFor={`startTime-0`}
                    style={{ marginRight: "33px" }}
                  >
                    Add/Edit Start Time
                  </label>
                  <input type="time" id={`startTime-0`} />
                </div>

                <div className="select__wrapper" style={{ marginTop: "10px" }}>
                  <label htmlFor={`endTime-0`} style={{ marginRight: "37px" }}>
                    Add/Edit End Time
                  </label>
                  <input type="time" id={`endTime-0`} />
                </div>
                <button
                  onClick={() => {
                    const selectedDay = document.getElementById(`day-0`).value;
                    const appointmentName = document.getElementById(`appointment-0`).value;
                    const startTime = document.getElementById(`startTime-0`).value;
                    const endTime = document.getElementById(`endTime-0`).value;
                    if (appointmentName && startTime && endTime) {
                      handleAddAppointment(
                        0,
                        appointmentName,
                        startTime,
                        endTime,
                        selectedDay
                      );
                      document.getElementById(`table-0`).style.display =
                        "table";
                    }
                  }}
                  style={{ marginTop: "20px", marginLeft: "160px" }}
                >
                  Add/Edit
                </button>

                <button
                  onClick={() => handleViewButtonClick(0)}
                  style={{ marginTop: "20px", marginLeft: "20px" }}
                >
                  View
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div>
        <TableContainer
          style={{
            border: "1px solid #ddd",
            padding: "25px",
            borderRadius: "10px",
            margin: "155px", // You can adjust this margin as needed
            width: "600px",
            height: "auto",
            display: "none",
            flexDirection: "column",
            alignItems: "center",
          }}
          id={`table-0`}
        >
          <Table style={{ border: "1px solid black" }}>
            <TableHead>
              <TableRow>
                <TableCell style={{ borderBottom: "1px solid black" }}>
                  Day
                </TableCell>
                <TableCell style={{ borderBottom: "1px solid black" }}>
                  Appointment
                </TableCell>
                <TableCell style={{ borderBottom: "1px solid black" }}>
                  Start Time
                </TableCell>
                <TableCell style={{ borderBottom: "1px solid black" }}>
                  End Time
                </TableCell>
                <TableCell style={{ borderBottom: "1px solid black" }}>
                  <Link to="/calendarpage">
                    <Button
                      onClick={() => {
                        handleSaveButtonClick(0);
                        navigate("/calendarpage");
                      }}
                      style={{
                        color: "black",
                        border: "1px solid black",
                        padding: "2px",
                      }}
                    >
                      Save
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {schedule.map((day, dayIndex) => (
                day.appointments.map((appointment, appIndex) => (
                  <TableRow key={appIndex}>
                    <TableCell style={{ borderBottom: "1px solid black" }}>
                      {day.day}
                    </TableCell>
                    <TableCell style={{ borderBottom: "1px solid black" }}>
                      {appointment.name}
                    </TableCell>
                    <TableCell style={{ borderBottom: "1px solid black" }}>
                      {appointment.startTime}
                    </TableCell>
                    <TableCell style={{ borderBottom: "1px solid black" }}>
                      {appointment.endTime}
                    </TableCell>
                    <TableCell style={{ borderBottom: "1px solid black" }}>
                      <Button onClick={() => handleEditAppointment(dayIndex, appIndex)}>
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDeleteAppointment(dayIndex, appIndex)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {showCalendar && <CalendarPage schedule={schedule} />}
    </div>
  );
};

export default Appointment;
