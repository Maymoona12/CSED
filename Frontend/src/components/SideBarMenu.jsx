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

  const settings2 = ["LecturersProfile", "GalleryPage"];

  const settings3 = [
    "EditProfile",
    "PostAnnouncement",
    "AddAppointment",
    "GalleryPage",
    "AddPhoto",
  ];
  // const settings4 = ["Home"];

  const handleDrawerClose = () => {
    setSideBar((previous) => !previous);
  };

  return (
    <Stack direction="row">
      <div style={{ marginTop: "-50px" }}>
        <List>
          <ListItemButton>
            <Link
              to={`/me`}
              style={{
                textDecoration: "none",
                color: "black",
                "&:hover": { backgroundColor: "lightblue" },
              }}
            >
              <Typography style={{ color: "white" }}>Home</Typography>
            </Link>
          </ListItemButton>
          {user?.role == "doctor" &&
            settings1.map((setting) => (
              <ListItemButton key={setting} onClick={handleDrawerClose}>
                <Link
                  to={`/me/${setting}`}
                  style={{
                    textDecoration: "none",
                    color: "black",
                    "&:hover": { backgroundColor: "lightblue" },
                  }}
                >
                  <Typography style={{ color: "white" }}>{setting}</Typography>
                </Link>
              </ListItemButton>
            ))}

          {user?.role == "admin" &&
            settings3.map((setting) => (
              <ListItemButton key={setting} onClick={handleDrawerClose}>
                <Link
                  to={`/me/${setting}`}
                  style={{
                    textDecoration: "none",
                    color: "black",
                    "&:hover": { backgroundColor: "lightblue" },
                  }}
                >
                  <Typography style={{ color: "white" }}>{setting}</Typography>
                </Link>
              </ListItemButton>
            ))}
          {user?.role == "student" &&
            settings2.map((setting) => (
              <ListItemButton key={setting} onClick={handleDrawerClose}>
                <Link
                  to={`/me/${setting}`}
                  style={{
                    textDecoration: "none",
                    color: "black",
                    "&:hover": { backgroundColor: "lightblue" },
                  }}
                >
                  <Typography style={{ color: "white" }}>{setting}</Typography>
                </Link>
              </ListItemButton>
            ))}
        </List>
      </div>
    </Stack>
  );
};

export default SideBarMenu;
