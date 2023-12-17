import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Avatar,
  Typography,
  Box,
  Stack,
  Badge,
  Menu,
  IconButton,
  Tooltip,
  MenuItem,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import "./style.css";

const StudentPage = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const settings = [
    "Profile",
    "Lecturers Profile",
    "Archive Page",
    "Change Password",
    "Logout",
  ];

  const Students = [
    {
      name: "Fatima Omar",
      photoUrl: "CoverImages/image1.jpg",
    },
  ];

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div>
      <AppBar
        position="static"
        style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000 }}
        sx={{ background: "black" }}
      >
        <Toolbar>
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, fontFamily: "Brush Script MT" }}
          >
            CSED
          </Typography>

          <Stack spacing={4} direction="row" sx={{ color: "white", marginRight: "20px" }}>
            <Badge color="secondary" badgeContent={0}>
              <NotificationsIcon />
            </Badge>
          </Stack>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Thaer" src="CoverImages/image1.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <Link to={`/${setting.replace(/\s+/g, "")}`} key={setting} style={{ textDecoration: "none" }}>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" sx={{ color: "black" }}>
                      {setting}
                    </Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <div 
        style={{
          font: "70px  black  solid",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "320px", // Adjusted margin to provide space for AppBar
          fontFamily: "Georgia",
                  }}
      >
        <div style={{ marginBottom: "8px", marginRight: "8px" }}>Hello,</div>
        <div style={{ marginBottom: "8px" }}>{Students[0].name}</div>
      </div>
    </div>
  );
};

export default StudentPage;
