import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Avatar } from "@mui/material";
import logo1 from "../../../CoverImages/UniversityLogo.jpg";
import logo2 from "../../../CoverImages/UniversityLogo2.jpg";
import logo3 from "../../../CoverImages/UniversityLogo3.jpg";

export default function AppBarGeneral() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        style={{
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
        }}
      >
        <Toolbar sx={{ justifyContent: "center" }}>
          <Avatar
            alt="User"
            src={logo1}
            style={{
              border: "1px solid #ccc",
              objectFit: "contain",
            }}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
