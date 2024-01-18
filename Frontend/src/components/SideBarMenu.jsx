import React, { useState } from "react";
import {
  MenuItem,
  Typography,
  Menu,
  Stack,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const SideBarMenu = () => {
  const { getUser, sideBar, setSideBar } = useAuth();
  const user = getUser();

  const settings1 = [
    "EditProfile",
    "ChangePassword",
    "PostAnnouncement",
    "AddAppointment",
    "GalleryPage",
    "AddPhoto",
  ];
  const handleDrawerClose = () => {
    setSideBar((previous) => !previous);
  };

  return (
    <Stack direction="row">
      <List>
        {user?.role == "doctor" &&
          settings1.map((setting) => (
            <ListItemButton key={setting} onClick={handleDrawerClose}>
              <Link
                to={`/me/${setting}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <Typography style={{ color: "white" }}>{setting}</Typography>
              </Link>
            </ListItemButton>
          ))}
      </List>

      {/* {user?.role == "student" &&
          settings2.map((setting) => (
            <MenuItem key={setting} onClick={handleCloseUserMenu}>
              <Link
                to={`/me/${setting}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <Typography>{setting}</Typography>
              </Link>
            </MenuItem>
          ))} */}
      {/* {user?.role == "admin" &&
          settings3.map((setting) => (
            <MenuItem key={setting} onClick={handleCloseUserMenu}>
              <Link
                to={`/me/${setting}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <Typography>{setting}</Typography>
              </Link>
            </MenuItem>
          ))} */}

      {/* <MenuItem onClick={handleLogout}>Logout</MenuItem> */}
    </Stack>
  );
};

export default SideBarMenu;
