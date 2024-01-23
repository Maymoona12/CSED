import React, { useState, useRef } from "react";
import {
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
import { useNavigate } from "react-router-dom";
import useAppointment from "./useAppointment";

const Appointment = () => {
  const formRef = useRef(null);
  const { mutate } = useAppointment();
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [schedule, setSchedule] = useState([
    { day: "Sun", appointments: [] },
    { day: "Mon", appointments: [] },
    { day: "Tue", appointments: [] },
    { day: "Wed", appointments: [] },
    { day: "Thu", appointments: [] },
  ]);
  const [blockedRows, setBlockedRows] = useState(
    Array(schedule.length).fill(false)
  );
  const [timeDivision, setTimeDivision] = useState(10);
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);
  const navigate = useNavigate();
  const [tableVisibility, setTableVisibility] = useState(false);

  const handleAddAppointment = (
    dayIndex,
    appointment,
    startTime,
    endTime,
    selectedDay
  ) => {
    const division = timeDivision;
    const start = new Date(`2023-01-01T${startTime}:00`);
    const end = new Date(`2023-01-01T${endTime}:00`);
    const interval = division * 60 * 1000;

    const appointments = [];
    let previousEndTime = start;

    for (
      let current = start;
      current < end;
      current.setTime(current.getTime() + interval)
    ) {
      const formattedTime = current.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      const nextEndTime = new Date(current.getTime() + interval);
      const formattedEndTime = nextEndTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      appointments.push({
        day: selectedDay,
        name: appointment,
        startTime: formattedTime,
        endTime: formattedEndTime,
        blocked: false,
      });

      previousEndTime = new Date(current);
    }

    const updatedSchedule = [...schedule];

    if (editingAppointment !== null) {
      updatedSchedule[dayIndex].appointments.splice(
        editingAppointment,
        1,
        ...appointments
      );
      setEditingAppointment(null);
    } else {
      updatedSchedule[dayIndex].appointments.push(...appointments);
    }

    setSchedule(updatedSchedule);

    document.getElementById(`appointment-0`).value = "";
    document.getElementById(`startTime-0`).value = "";
    document.getElementById(`endTime-0`).value = "";

    setAllFieldsFilled(false); // Reset the state
    console.log("Data saved to state:", updatedSchedule);
  };

  const handleViewButtonClick = (dayIndex) => {
    setTableVisibility(!tableVisibility);
  };

  const handleDeleteAppointment = (dayIndex, appIndex) => {
    const updatedSchedule = [...schedule];
    updatedSchedule[dayIndex].appointments.splice(appIndex, 1);
    setSchedule(updatedSchedule);
  };

  const handleBlockAppointment = (dayIndex, appIndex) => {
    const updatedBlockedRows = [...blockedRows];
    updatedBlockedRows[dayIndex] = true;
    setBlockedRows(updatedBlockedRows);

    const updatedSchedule = [...schedule];
    updatedSchedule[dayIndex].appointments[appIndex].blocked = true;
    setSchedule(updatedSchedule);
  };

  const handleUnblockAppointment = (dayIndex, appIndex) => {
    const updatedBlockedRows = [...blockedRows];
    updatedBlockedRows[dayIndex] = false;
    setBlockedRows(updatedBlockedRows);

    const updatedSchedule = [...schedule];
    updatedSchedule[dayIndex].appointments[appIndex].blocked = false;
    setSchedule(updatedSchedule);
  };

  const handleSaveButtonClick = (dayIndex, event) => {
    event.preventDefault();
    const tableElement = document.getElementById(`table-${dayIndex}`)

    const formElement = formRef.current;

    if (!formElement) {
      console.error("Form element is null");
      return;
    }

    const formData = new FormData(formElement);
    const data = {};

    // Convert FormData to a simple object
    formData.forEach((value, key) => {
      data[key] = value;
    });

    // Use the data object for your mutation
    const { start_time, finish_time, day, app_name, time_devision } = data;

    mutate({ start_time, finish_time, day, app_name, time_devision });
  };

  const handleInputChange = () => {
    const selectedDay = document.getElementById(`day-0`).value;
    const appointmentName = document.getElementById(`appointment-0`).value;
    const startTime = document.getElementById(`startTime-0`).value;
    const endTime = document.getElementById(`endTime-0`).value;

    const areLastFieldsFilled =
      selectedDay && appointmentName && startTime && endTime;
    setAllFieldsFilled(areLastFieldsFilled);
  };

  return (
    <div
      style={{
        marginBottom: "20px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <form ref={formRef} onSubmit={(event) => handleSaveButtonClick(0, event)}>
        <div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              marginLeft: "30px",
            }}
          >
            <h1 style={{ color: "#1f3f66", fontFamily: "Garamond" }}>
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
                minWidth: "395px",
                height: "230px",
                border: "1px solid #ddd",
                borderRadius: "20px",
                color: "black",
              }}
            >
              <CardContent>
                <Typography gutterBottom>
                  <label
                    htmlFor={`day-0`}
                    style={{ marginRight: "105px", fontFamily: "sarfi" }}
                  >
                    Day
                  </label>
                  <select id={`day-0`} name="day" onChange={handleInputChange}>
                    <option value="Sun">Sunday</option>
                    <option value="Mon">Monday</option>
                    <option value="Tue">Tuesday</option>
                    <option value="Wed">Wednesday</option>
                    <option value="Thu">Thursday</option>
                  </select>
                </Typography>

                <label
                  htmlFor={`appointment-0`}
                  style={{ marginRight: "15px" }}
                >
                  Appointment Title
                </label>
                <input
                  id={`appointment-0`}
                  name="app_name"
                  type="text"
                  onChange={handleInputChange}
                />
                <div className="select__wrapper" style={{ marginTop: "10px" }}>
                  <label
                    htmlFor={`startTime-0`}
                    style={{ marginRight: "33px" }}
                  >
                    Add Start Time
                  </label>
                  <input
                    id={`startTime-0`}
                    name="start_time"
                    type="time"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="select__wrapper" style={{ marginTop: "10px" }}>
                  <label htmlFor={`endTime-0`} style={{ marginRight: "37px" }}>
                    Add End Time
                  </label>
                  <input
                    id={`endTime-0`}
                    name="finish_time"
                    type="time"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="select__wrapper" style={{ marginTop: "10px" }}>
                  <label
                    htmlFor={`timeDivision`}
                    style={{ marginRight: "38px" }}
                  >
                    Time Division
                  </label>
                  <select
                    id={`timeDivision`}
                    name="time_devision"
                    value={timeDivision}
                    onChange={(e) => setTimeDivision(Number(e.target.value))}
                  >
                    <option value={10}>10 minutes</option>
                    <option value={15}>15 minutes</option>
                    <option value={20}>20 minutes</option>
                    <option value={30}>30 minutes</option>
                  </select>
                </div>
                <button
                  onClick={() => {
                    const selectedDay = document.getElementById(`day-0`).value;
                    const appointmentName =
                      document.getElementById(`appointment-0`).value;
                    const startTime =
                      document.getElementById(`startTime-0`).value;
                    const endTime = document.getElementById(`endTime-0`).value;
                    const dayIndex = schedule.findIndex(
                      (day) => day.day === selectedDay
                    );

                    if (
                      dayIndex !== -1 &&
                      appointmentName &&
                      startTime &&
                      endTime &&
                      allFieldsFilled
                    ) {
                      handleAddAppointment(
                        dayIndex,
                        appointmentName,
                        startTime,
                        endTime,
                        selectedDay
                      );
                      document.getElementById(
                        `table-${dayIndex}`
                      ).style.display = "table";
                    }
                  }}
                  style={{ marginTop: "20px", marginLeft: "128px" }}
                  disabled={!allFieldsFilled}
                >
                  Add
                </button>
                <button
                  onClick={() => handleViewButtonClick(0)}
                  style={{ marginTop: "20px", marginLeft: "20px" }}
                >
                  View
                </button>
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
              margin: "100px 64px",
              width: "650px",
              height: "auto",
              display: tableVisibility ? "flex" : "none", // Use the state here

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
                    <Button
                      onClick={(event) => handleSaveButtonClick(0, event)}
                      style={{
                        color: "black",
                        border: "1px solid black",
                        padding: "2px",
                      }}
                    >
                      Save
                    </Button>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {schedule.map((day, dayIndex) =>
                  day.appointments.map((appointment, appIndex) => (
                    <TableRow
                      key={appIndex}
                      style={{
                        opacity: appointment.blocked ? 0.5 : 1,
                        backgroundColor: appointment.blocked
                          ? "#ffcccc"
                          : "inherit",
                      }}
                    >
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
                        <Button
                          onClick={() =>
                            handleDeleteAppointment(dayIndex, appIndex)
                          }
                        >
                          Delete
                        </Button>
                        {appointment.blocked ? (
                          <Button
                            onClick={() =>
                              handleUnblockAppointment(dayIndex, appIndex)
                            }
                          >
                            Unblock
                          </Button>
                        ) : (
                          <Button
                            onClick={() =>
                              handleBlockAppointment(dayIndex, appIndex)
                            }
                          >
                            Block
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </form>
    </div>
  );
};

export default Appointment;
