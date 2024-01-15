import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import useSignup from "../../SiginupApi/useSiginup";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const isStrongPassword = (password) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

const defaultTheme = createTheme();

export default function Signup() {
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { mutate } = useSignup();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get("name");
    const reg_no = data.get("reg_no");
    const email = data.get("email");
    const password = data.get("password");
    const password_confirmation = data.get("password_confirmation");

    mutate({ name, reg_no, email, password, password_confirmation });

    const enteredEmail = data.get("email");
    const enteredPassword = data.get("password");
    const enteredConfirmPassword = data.get("password_confirmation");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(enteredEmail)) {
      setAlertMessage(" Invalid email format !");
      setOpen(true);
      return;
    }

    if (enteredPassword !== enteredConfirmPassword) {
      setAlertMessage(" Passwords do not match !");
      setOpen(true);
      return;
    }

    if (!isStrongPassword(enteredPassword)) {
      setAlertMessage(
        "  Password must be strong (at least 8 characters including one uppercase letter, one lowercase letter, one digit, and one special character) !"
      );
      setOpen(true);
      return;
    }

    console.log({
      username: data.get("name"),
      email: enteredEmail,
      password: enteredPassword,
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        component="main"
        sx={{ height: "100vh", justifyContent: "center", alignItems: "center" }}
      >
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "10px 60px", // Adjusted padding
              margin: "auto",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "black" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ fontSize: "1.5rem" }}>
              {" "}
              {/* Adjusted font size */}
              Sign Up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="User Name"
                name="name"
                autoComplete="user_name"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="reg_no"
                label="Student Number"
                name="reg_no"
                autoComplete="student_number"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Your University Email Address"
                name="email"
                autoComplete="email"
                type="email"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePasswordVisibility}
                    >
                      {showPassword ? (
                        <VisibilitIcony />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  ),
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password_confirmation"
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                id="password_confirmation"
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleToggleConfirmPasswordVisibility}
                    >
                      {showConfirmPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  ),
                }}
              />

              <Button
                className="signup"
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  background: "black",
                  "&:hover": {
                    background: "black",
                  },
                }}
              >
                Sign Up
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Snackbar
        open={open}
        autoHideDuration={10000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <div>
          <Alert
            onClose={() => {
              handleClose();
              setAlertMessage("");
            }}
            severity="error"
            sx={{ width: "100%" }}
          >
            {alertMessage}
          </Alert>
        </div>
      </Snackbar>
    </ThemeProvider>
  );
}
