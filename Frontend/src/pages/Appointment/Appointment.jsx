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
import useAppointment from "./useAppointment";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import useMyAppo from "./useMyAppo";
import useBlock from "./Block&Delete/useBlock";
import useDelete from "./Block&Delete/useDelete";
import useUnBlock from "./Block&Delete/useUnBlock";

const Appointment = () => {
  const formRef = useRef(null);
  const { mutate } = useAppointment();
  const { myAppointment } = useMyAppo();
  const { mutate: block } = useBlock();
  const { mutate: deleted } = useDelete();
  const { mutate: unblock } = useUnBlock();

  const [schedule, setSchedule] = useState([
    { day: "Sun", appointments: [] },
    { day: "Mon", appointments: [] },
    { day: "Tue", appointments: [] },
    { day: "Wed", appointments: [] },
    { day: "Thu", appointments: [] },
  ]);

  const [isTableVisible, setIsTableVisible] = useState(false);
  const dayRef = useRef(null);
  const appointmentRef = useRef(null);
  const startTimeRef = useRef(null);
  const endTimeRef = useRef(null);
  const [open, setOpen] = useState(false);

  const [blockedRows, setBlockedRows] = useState([]);

  const handleShowSchedule = () => {
    setIsTableVisible(!isTableVisible);
  };

  const handleDeleteAppointment = (event, id) => {
    // const updatedSchedule = [...schedule];
    // updatedSchedule[dayIndex].appointments.splice(appIndex, 1);
    // setSchedule(updatedSchedule);
    event.preventDefault();
    deleted({ id });
  };

  const handleBlockAppointment = (event, id) => {
    event.preventDefault();
    block({ id });

    // Add the index of the blocked row to the state
    setBlockedRows((prevBlockedRows) => [...prevBlockedRows, id]);
  };

  const handleUnblockAppointment = (event, id) => {
    event.preventDefault();
    unblock({ id });

    // Remove the index of the unblocked row from the state
    setBlockedRows((prevBlockedRows) =>
      prevBlockedRows.filter((rowIndex) => rowIndex !== id)
    );
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
            margin: "15px",
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
              padding: "5px",
              minWidth: "300px",
              height: "440px",
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
                  marginTop: "10px",
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
          style={{
            marginTop: "20px",
            marginLeft: "500px",
            backgroundColor: isTableVisible ? "gray" : "#1f3f66",
            color: "white",
            padding: "10px",
            width: "200px",
          }}
        >
          {isTableVisible ? "Hide Table" : "Show Table"}
        </Button>
        {isTableVisible && (
          <div
            style={{
              gap: "40px",
              padding: "30px",
              // marginTop: "10px",
            }}
          >
            <Box
              style={{
                width: "550px",
                border: "1px solid lightgray",
                height: "auto",
                padding: "30px",
                borderRadius: "10px",
                marginTop: "5px",
                marginLeft: "100px",
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
                        <TableRow
                          key={appointment.id}
                          style={{
                            opacity: blockedRows.includes(appointment.id)
                              ? 0.5
                              : 1,
                          }}
                        >
                          <TableCell>{appointment.day}</TableCell>
                          <TableCell>{appointment.start_time}</TableCell>
                          <TableCell>{appointment.end_time}</TableCell>

                          <TableCell>
                            <Button
                              style={{ color: "red" }}
                              onClick={(event) =>
                                handleDeleteAppointment(event, appointment.id)
                              }
                            >
                              Delete
                            </Button>
                            <Button
                              style={{ color: "black" }}
                              onClick={(event) =>
                                handleBlockAppointment(event, appointment.id)
                              }
                              disabled={blockedRows.includes(appointment.id)}
                            >
                              Block
                            </Button>
                            <Button
                              style={{ color: "blue" }}
                              onClick={(event) =>
                                handleUnblockAppointment(event, appointment.id)
                              }
                              disabled={!blockedRows.includes(appointment.id)}
                            >
                              Unblock
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </Box>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointment;
