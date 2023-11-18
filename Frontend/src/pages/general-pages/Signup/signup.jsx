import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
// function Alert(props) {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

// function getPasswordStrength(password) {
//   if (password.length < 6) {
//     return "Weak";
//   } else if (password.length < 10) {
//     return "Medium";
//   } else {
//     return "Strong";
//   }
// }
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        CSED
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function Signup() {
  // const [passwordStrength, setPasswordStrength] = React.useState("");
  // const [openSnackbar, setOpenSnackbar] = React.useState(false);

  // const handlePasswordChange = (event) => {
  //   const password1 = event.target.value;
  //   const strength = getPasswordStrength(password1);
  //   setPasswordStrength(strength);

  //   setOpenSnackbar(true);
  // };
  // const handleSnackbarClose = (event, reason) => {
  //   event.preventDefault();
  //   if (reason === "clickaway") {
  //     return;
  //   }
  //   setOpenSnackbar(false);
  // };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const password = data.get("password");
    const conformPassword = data.get("conform_password");

    if (password !== conformPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log({
      username: data.get("user_name"),
      email: data.get("email"),
      password,
      conform_password: conformPassword,
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        component="main"
        sx={{ height: "100%", alignItems: "flex-start" }}
      >
        <CssBaseline />
        <Grid item xs={12} sm={4} md={7}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: "16px",
            }}
          >
            <img
              src="./Images/Logo.png"
              alt="Logo"
              style={{ width: "500px", height: "auto" }}
            />
            <Typography
              variant="h1"
              sx={{
                mt: 2,
                color: "black",
                textAlign: "center",
                fontFamily: "Brush Script MT",
              }}
            >
              Welcome
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "70px",
              margin: "auto",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "black" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
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
                id="user_name"
                label="User Name"
                name="user_name"
                autoComplete="user_name"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                // onChange={handlePasswordChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="conform_password"
                label="Conform Password"
                type="password"
                id="conform_password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
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
              <Copyright sx={{ mt: 5 }} />
            </Box>
            {/* <Snackbar
              open={openSnackbar}
              autoHideDuration={6000}
              onClose={handleSnackbarClose}
            >
              <Alert severity="info">
                Password Strength: {passwordStrength}
              </Alert>
            </Snackbar> */}
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
