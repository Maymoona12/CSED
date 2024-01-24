import React, { useState, useRef } from "react";
import {
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate } from "react-router-dom";
import useAppointment from "./useAppointment";
import Collapse from "@mui/material/Collapse";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

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
  const [isTableVisible, setIsTableVisible] = useState(false); 
  const dayRef = useRef(null);
  const appointmentRef = useRef(null);
  const startTimeRef = useRef(null);
  const endTimeRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleShowSchedule = () => {
    setIsTableVisible(!isTableVisible); 
  };
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

    dayRef.current.value = "";
    appointmentRef.current.value = "";
    startTimeRef.current.value = "";
    endTimeRef.current.value = "";

    setAllFieldsFilled(false); // Reset the state
    console.log("Data saved to state:", updatedSchedule);
  };

  const handleViewButtonClick = () => {
    setIsTableVisible(!isTableVisible);
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

  const handleSaveButtonClick = (event) => {
    event.preventDefault();

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
    const selectedDay = dayRef.current.value;
    const appointmentName = appointmentRef.current.value;
    const startTime = startTimeRef.current.value;
    const endTime = endTimeRef.current.value;

    const areLastFieldsFilled =
      selectedDay && appointmentName && startTime && endTime;
    setAllFieldsFilled(areLastFieldsFilled);
    console.log(startTime);
  };

  const handleChange = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div
      style={{
        marginBottom: "20px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <form ref={formRef} onSubmit={(event) => handleSaveButtonClick(event)}>
        <div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              marginLeft: "40px",
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
              marginTop: "10px",
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
                minWidth: "310px",
                height: "450px",
                border: "1px solid #ddd",
                borderRadius: "20px",
                color: "black",
              }}
            >
              <CardContent>
                <Typography gutterBottom marginTop={2}>
                  <FormControl fullWidth>
                    <InputLabel id="Daylabel">Day</InputLabel>
                    <Select
                      labelId="Daylabel"
                      label="Day"
                      ref={dayRef}
                      id={`day-0`}
                      name="day"
                      onChange={handleInputChange}
                    >
                      <MenuItem value={"Sun"}>Sunday</MenuItem>
                      <MenuItem value={"Mon"}>Monday</MenuItem>
                      <MenuItem value={"Tue"}>Tuesday</MenuItem>
                      <MenuItem value={"Wed"}>Wednesday</MenuItem>
                      <MenuItem value={"Thu"}>Thursday</MenuItem>
                    </Select>
                  </FormControl>
                </Typography>
                <Typography marginTop={2}>
                  <TextField
                    fullWidth
                    id={`appointment-0`}
                    name="app_name"
                    label="Appointment Title"
                    variant="outlined"
                    onChange={handleInputChange}
                  />
                </Typography>
                <Typography marginTop={2}>
                  <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth>
                    <MobileTimePicker
                      ref={startTimeRef}
                      id={`startTime-0`}
                      name="start_time"
                      label={"Start Time"}
                      views={["hours", "minutes", "seconds"]}
                      onChange={handleInputChange}
                    />
                  </LocalizationProvider>
                </Typography>
                <Typography marginTop={2}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileTimePicker
                      ref={endTimeRef}
                      id={`endTime-0`}
                      name="finish_time"
                      label={"End Time"}
                      views={["hours", "minutes", "seconds"]}
                      onChange={handleInputChange}
                    />
                  </LocalizationProvider>
                </Typography>
                <Typography marginTop={2}>
                  <FormControl fullWidth>
                    <InputLabel id="TimeDivision">Time Division</InputLabel>
                    <Select
                      labelId="TimeDivisionlable"
                      label="Time Division"
                      id={`timeDivision`}
                      name="time_devision"
                      onChange={handleInputChange}
                    >
                      <MenuItem value={10}>10 minutes</MenuItem>
                      <MenuItem value={15}>15 minutes</MenuItem>
                      <MenuItem value={20}>20 minutes</MenuItem>
                      <MenuItem value={30}>30 minutes</MenuItem>
                    </Select>
                  </FormControl>
                </Typography>
                <Button
                  onClick={(event) => {
                    handleSaveButtonClick(event);
                    // const selectedDay =
                    //   document.getElementById(`day-0`).value;
                    // const appointmentName =
                    //   document.getElementById(`appointment-0`).value;
                    // const startTime =
                    //   document.getElementById(`startTime-0`).value;
                    // const endTime =
                    //   document.getElementById(`endTime-0`).value;
                    // const dayIndex = schedule.findIndex(
                    //   (day) => day.day === selectedDay
                    // );

                    // if (
                    //   dayIndex !== -1 &&
                    //   appointmentName &&
                    //   startTime &&
                    //   endTime &&
                    //   allFieldsFilled
                    // ) {
                    //   handleAddAppointment(
                    //     dayIndex,
                    //     appointmentName,
                    //     startTime,
                    //     endTime,
                    //     selectedDay
                    //   );
                    //   document.getElementById(
                    //     `table-${dayIndex}`
                    //   ).style.display = "table";
                    // }
                  }}
                  style={{
                    marginTop: "30px",
                    marginLeft: "30%",
                    backgroundColor: "#1f3f66",
                    color: "white",
                  }}
                >
                  Add
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        <Collapse in={open}>
          <div>
            <TableContainer
              style={{
                border: "1px solid #ddd",
                padding: "25px",
                borderRadius: "10px",
                margin: "100px 64px",
                width: "650px",
                height: "auto",
                display: isTableVisible ? "flex" : "none",
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
                      Appointment Title
                    </TableCell>
                    <TableCell style={{ borderBottom: "1px solid black" }}>
                      Start Time
                    </TableCell>
                    <TableCell style={{ borderBottom: "1px solid black" }}>
                      End Time
                    </TableCell>
                    <TableCell
                      style={{ borderBottom: "1px solid black" }}
                    ></TableCell>
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
        </Collapse>
      </form>
      <Button
        onClick={handleShowSchedule}
        style={{
          marginTop: "20px",
          marginLeft: "10px",
          backgroundColor: "#1f3f66",
          color: "white",
        }}
      >
        {isTableVisible ? "Hide Schedule" : "Show Schedule"}
      </Button>
    </div>
  );
};

export default Appointment;
