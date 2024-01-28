import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const generateRandomVerificationCode = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

const sendVerificationEmail = async (email, verificationCode) => {
  console.log(
    `Sending verification email to ${email} with code ${verificationCode}`
  );
  // Example: Use a service like Nodemailer or an API to send the email
};

const isStrongPassword = (password) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

const defaultTheme = createTheme();

export default function Forgotpassword() {
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [generatedVerificationCode, setGeneratedVerificationCode] =
    useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleSendVerificationCode = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const enteredEmail = data.get("email");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(enteredEmail)) {
      setAlertMessage("Invalid email format!");
      setOpen(true);
      return;
    }

    const verificationCode = generateRandomVerificationCode();
    setGeneratedVerificationCode(verificationCode);

    try {
      await sendVerificationEmail(enteredEmail, verificationCode);
      setAlertMessage("Verification code sent successfully!");
      setOpen(true);
    } catch (error) {
      console.error("Error sending verification email:", error);
      setAlertMessage("Error sending verification code. Please try again.");
      setOpen(true);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const enteredEmail = data.get("email");
    const enteredVerificationCode = data.get("verification_code");
    const enteredNewPassword = data.get("new_password");
    const enteredConfirmPassword = data.get("confirm_password");

    if (enteredVerificationCode !== generatedVerificationCode) {
      setAlertMessage("Invalid verification code!");
      setOpen(true);
      return;
    }

    if (enteredNewPassword !== enteredConfirmPassword) {
      setAlertMessage("Passwords do not match!");
      setOpen(true);
      return;
    }

    if (!isStrongPassword(enteredNewPassword)) {
      setAlertMessage("Password must meet strength criteria!");
      setOpen(true);
      return;
    }

    try {
      // Replace the following with your actual logic to update the password
      console.log(
        `Updating password for ${enteredEmail} to ${enteredNewPassword}`
      );

      setAlertMessage("Password updated successfully!");
      setOpen(true);

      event.target.reset();
    } catch (error) {
      console.error("Error updating password:", error);
      setAlertMessage("Error updating password. Please try again.");
      setOpen(true);
    }
  };

  const handleTogglePasswordVisibility = (field) => {
    if (field === "password") {
      setShowPassword((prevShowPassword) => !prevShowPassword);
    } else if (field === "confirm_password") {
      setShowConfirmPassword(
        (prevShowConfirmPassword) => !prevShowConfirmPassword
      );
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        component="main"
        sx={{  justifyContent: "center", alignItems: "center", mb:1 }}
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
              padding: "15px 60px",
              margin: "auto",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#1f3f66" }}>
              <KeyOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              New Password
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSendVerificationCode}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                type="email"
              />
              <Button
                className="recover_email"
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 1,
                  mb: 1,
                  background: "#1f3f66",
                  "&:hover": {
                    background: "#1f3f66",
                  },
                }}
              >
                Send Verification Code
              </Button>
            </Box>
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
                id="verification_code"
                label="Verification Code"
                name="verification_code"
                autoComplete="verification_code"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="new_password"
                label="New Password"
                type={showPassword ? "text" : "password"}
                id="new_password"
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={() =>
                          handleTogglePasswordVisibility("password")
                        }
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirm_password"
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                id="confirm_password"
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={() =>
                          handleTogglePasswordVisibility("confirm_password")
                        }
                      >
                        {showConfirmPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                className="signup"
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 1,
                  mb: 1,
                  background: "#1f3f66",
                  "&:hover": {
                    background: "#1f3f66",
                  },
                }}
              >
                Update Password
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
      {/* Snackbar outside the grid for global positioning */}
      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={9000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <div>
          <Alert
            onClose={() => {
              handleClose();
              setAlertMessage("");
            }}
            severity={alertMessage.includes("success") ? "success" : "error"}
            sx={{ width: "110%" }}
          >
            {alertMessage}
          </Alert>
        </div>
      </Snackbar>
    </ThemeProvider>
  );
}
