import React, { useState, useRef } from "react";
import {
  Box,
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
  Paper,
} from "@mui/material";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate } from "react-router-dom";
import useAppointment from "./useAppointment";
import Collapse from "@mui/material/Collapse";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import useMyAppo from "./useMyAppo";

const Appointment = () => {
  const formRef = useRef(null);
  const { mutate } = useAppointment();
  const { myAppointment } = useMyAppo();
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
  const [isTableVisible, setIsTableVisible] = useState(false);
  const dayRef = useRef(null);
  const appointmentRef = useRef(null);
  const startTimeRef = useRef(null);
  const endTimeRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleShowSchedule = () => {
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
      </form>
      <div>
        <Button
          onClick={handleShowSchedule}
          onChange={handleChange}
          style={{
            marginTop: "20px",
            marginLeft: "500px",
            backgroundColor: "#1f3f66",
            color: "white",
            padding: "10px",
            width: "200px",
          }}
        >
          Show Schedule
        </Button>
        <div
          style={{
            gap: "40px",
            padding: "30px",
            marginTop: "10px",
          }}
        >
          <Box
            style={{
              width: "550px",
              border: "1px solid lightgray",
              height: "auto",
              padding: "30px",
              borderRadius: "10px",
              marginTop: "20px",
              marginLeft: "200px",
            }}
          >
            <Typography
              variant="h5"
              style={{
                marginBottom: "20px",
                color: "black",
                fontFamily: "serif",
              }}
            >
              Schedule Data
            </Typography>
            <div
              style={{
                maxWidth: "auto",
              }}
            >
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      {/* <TableCell>Appointment Name</TableCell> */}
                      <TableCell>Day</TableCell>
                      <TableCell>Start At</TableCell>
                      <TableCell>End At</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {myAppointment?.map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell>{appointment.day}</TableCell>
                        <TableCell>{appointment.start_time}</TableCell>
                        <TableCell>{appointment.end_time}</TableCell>
                        <TableCell>{appointment.end_time}</TableCell>
                        <TableCell>
                          <Button onClick={() => handleDeleteAppointment()}>
                            Delete
                          </Button>
                          {appointment.blocked ? (
                            <Button onClick={() => handleUnblockAppointment()}>
                              Unblock
                            </Button>
                          ) : (
                            <Button onClick={() => handleBlockAppointment()}>
                              Block
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Box>
        </div>
      </div>

      {/* <Collapse in={open}> */}

      {/* </Collapse> */}
    </div>
  );
};

export default Appointment;
