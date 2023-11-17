import * as React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

export default function Coverpage() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        style={{ position: "fixed", top: 0, zIndex: 1000 }}
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
          <Link to="/login">
            <Button color="inherit" sx={{ color: "white" }}>
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button color="inherit" sx={{ color: "white" }}>
              Signup
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
      <Typography
        variant="h1"
        component="div"
        sx={{
          fontFamily: "Brush Script MT",
          color: "black",
          textAlign: "center",
          margin: "250px",
        }}
      >
        Welcome to the CSED Community
      </Typography>
    </Box>
  );
}
