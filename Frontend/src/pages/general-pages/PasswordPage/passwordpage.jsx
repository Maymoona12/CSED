import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const ForgotPassword = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement your password recovery logic here
    console.log("Password recovery logic goes here");
  };

  return (
    <div style={{ paddingLeft: "450px" }}>
      <Typography component="h1" variant="h4" style={{ fontFamily: "serif" }}>
        Forgot Password
      </Typography>
      <form onSubmit={handleSubmit}>
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
          Send Recovery Email
        </Button>
      </form>
    </div>
  );
};

export default ForgotPassword;
