import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const Appointment = () => {
  const navigate = useNavigate();

  const [schedule, setSchedule] = useState([
    { day: "Sun", appointments: [] },
    { day: "Mon", appointments: [] },
    { day: "Tue", appointments: [] },
    { day: "Wed", appointments: [] },
    { day: "Thu", appointments: [] },
  ]);

  const [editingAppointment, setEditingAppointment] = useState(null);

  const handleAddAppointment = (dayIndex, appointment, startTime, endTime) => {
    const updatedSchedule = [...schedule];
    if (editingAppointment !== null) {
      // If editing an existing appointment
      updatedSchedule[dayIndex].appointments[editingAppointment].name =
        appointment;
      updatedSchedule[dayIndex].appointments[editingAppointment].startTime =
        startTime;
      updatedSchedule[dayIndex].appointments[editingAppointment].endTime =
        endTime;
      setEditingAppointment(null); // Reset editing state
    } else {
      // If adding a new appointment
      updatedSchedule[dayIndex].appointments.push({
        name: appointment,
        startTime,
        endTime,
      });
    }
    setSchedule(updatedSchedule);
  };

  //👇🏻 Runs when a user signs out
  const handleLogout = () => {
    localStorage.removeItem("_id");
    localStorage.removeItem("_myEmail");
    navigate("/");
  };

  const handleEditAppointment = (dayIndex, appIndex) => {
    const appointmentToEdit = schedule[dayIndex].appointments[appIndex];
    document.getElementById(`appointment-${dayIndex}`).value =
      appointmentToEdit.name;
    document.getElementById(`startTime-${dayIndex}`).value =
      appointmentToEdit.startTime;
    document.getElementById(`endTime-${dayIndex}`).value =
      appointmentToEdit.endTime;
    setEditingAppointment(appIndex);
  };

  const handleDeleteAppointment = (dayIndex, appIndex) => {
    const updatedSchedule = [...schedule];
    updatedSchedule[dayIndex].appointments.splice(appIndex, 1);
    setSchedule(updatedSchedule);
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <AppBar
        position="static"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
        }}
        sx={{ background: "black" }}
      >
        <Toolbar>
          <Typography
            variant="h5"
            component="div"
            sx={{
              flexGrow: 1,
              fontFamily: "Brush Script MT",
            }}
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
      <div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            marginTop: "50px",
            marginLeft: "10px",
          }}
        >
          <h1
            style={{
              color: "black",
              fontFamily: "Garamond",
            }}
          >
            Book Appointment
          </h1>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            flexWrap: "wrap",
            marginTop: "20px",
            color: "black",
          }}
        >
          {schedule.map((sch, dayIndex) => (
            <div
              key={dayIndex}
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
                className="form"
                key={dayIndex}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  margin: "10px",
                  padding: "10px",
                  minWidth: "200px",
                  height: "250px",
                  border: "1px solid #ddd",
                  borderRadius: "20px",
                  color: "black",
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {sch.day}
                  </Typography>
                  <div className="select__wrapper">
                    <label
                      htmlFor={`appointment-${dayIndex}`}
                      style={{ marginRight: "10px" }}
                    >
                      Add/Edit Appointment
                    </label>
                    <input type="text" id={`appointment-${dayIndex}`} />

                    <div
                      className="select__wrapper"
                      style={{ marginTop: "10px" }}
                    >
                      <label
                        htmlFor={`startTime-${dayIndex}`}
                        style={{ marginRight: "30px" }}
                      >
                        Add/Edit Start Time
                      </label>
                      <input type="time" id={`startTime-${dayIndex}`} />
                    </div>

                    <div
                      className="select__wrapper"
                      style={{ marginTop: "10px" }}
                    >
                      <label
                        htmlFor={`endTime-${dayIndex}`}
                        style={{ marginRight: "35px" }}
                      >
                        Add/Edit End Time
                      </label>
                      <input type="time" id={`endTime-${dayIndex}`} />
                    </div>
                    <button
                      onClick={() => {
                        const appointmentName = document.getElementById(
                          `appointment-${dayIndex}`
                        ).value;
                        const startTime = document.getElementById(
                          `startTime-${dayIndex}`
                        ).value;
                        const endTime = document.getElementById(
                          `endTime-${dayIndex}`
                        ).value;
                        if (appointmentName && startTime && endTime) {
                          handleAddAppointment(
                            dayIndex,
                            appointmentName,
                            startTime,
                            endTime
                          );
                          document.getElementById(
                            `table-${dayIndex}`
                          ).style.display = "table";
                        }
                      }}
                      style={{ marginTop: "20px", marginLeft: "100px" }}
                    >
                      Add/Edit
                    </button>
                  </div>
                </CardContent>
              </Card>
              <TableContainer
                style={{ display: "none" }}
                id={`table-${dayIndex}`}
              >
                <Table style={{ border: "1px solid black" }}>
                  <TableHead>
                    <TableRow>
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
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sch.appointments.map((appointment, appIndex) => (
                      <TableRow key={appIndex}>
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
                          <Button
                            onClick={() =>
                              handleEditAppointment(dayIndex, appIndex)
                            }
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() =>
                              handleDeleteAppointment(dayIndex, appIndex)
                            }
                          >
                            Delete
                          </Button>
                          <Button>Save</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Appointment;
