import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import useLogin from "../../LoginApi/useLogin";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const defaultTheme = createTheme();

export default function Login() {
  const { mutate } = useLogin();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    mutate(
      { email, password },
      {
        onSuccess: () => {
          // Show success Snackbar
          setSnackbar({
            open: true,
            message: "Login Successful",
            severity: "success",
          });
        },
        onError: () => {
          // Show error Snackbar
          setSnackbar({
            open: true,
            message: "Login Failed",
            severity: "error",
          });
        },
      }
    );

    console.log({
      email: data.get("email"),
      password: data.get("password"),
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
              src="./CoverImages/Logo.png"
              alt="Logo"
              style={{ width: "500px", height: "auto" }}
            />
            <Typography
              variant="h1"
              sx={{
                mt: 2,
                color: "black",
                textAlign: "center",
                fontFamily: "Brush script MT",
              }}
            >
              Welcome Back
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
              padding: "60px",
              margin: "0px 0px",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "black" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              id="loginform"
              component="form"
              noValidate
              onSubmit={handleSubmit}
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
                autoFocus
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
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
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
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <RouterLink
                    to="/passwordpage"
                    variant="body2"
                    style={{
                      color: "black",
                      textDecoration: "none",
                    }}
                  >
                    Forgot password?
                  </RouterLink>
                </Grid>
                <Grid item>
                  <RouterLink
                    to="/signup"
                    variant="body2"
                    style={{
                      color: "black",
                      textDecoration: "none",
                    }}
                  >
                    {"Don't have an account? Sign Up"}
                  </RouterLink>
                </Grid>
              </Grid>
            </Box>
            <Snackbar
              open={snackbar.open}
              autoHideDuration={6000}
              onClose={handleCloseSnackbar}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <MuiAlert
                elevation={6}
                variant="filled"
                onClose={handleCloseSnackbar}
                severity={snackbar.severity}
              >
                {snackbar.message}
              </MuiAlert>
            </Snackbar>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
