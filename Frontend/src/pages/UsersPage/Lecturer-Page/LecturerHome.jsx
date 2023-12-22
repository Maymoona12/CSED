import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Avatar,
  Typography,
  Box,
  Button,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

const LecturerHome = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElAnnouncement, setAnchorElAnnouncement] = useState(null);
  const [announcementClicked, setAnnouncementClicked] = useState(false);

  const settings = [
    "Profile",
    "Edit Profile",
    "Post Announcement",
    "Lecturers Profile",
    "Add Appointment",
    "Archive Page",
    "Logout",
  ];
  const pages = ["Announcement"];

  const announcements = ["Title1", "Title2", "Title3"];

  const lecturers = [
    {
      name: "Dr.Thaer Samar",
      photoUrl: "ProfileImages/thaer.PNG",
    },
  ];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenAnnouncementMenu = (event) => {
    if (!announcementClicked) {
      setAnchorElAnnouncement(event.currentTarget);
    } else {
      setAnchorElAnnouncement(null);
    }
    setAnnouncementClicked(!announcementClicked);
  };

  const handleCloseAnnouncementMenu = () => {
    setAnchorElAnnouncement(null);
    setAnnouncementClicked(false);
  };

  return (
    <div
      style={{
        marginBottom: "20px",
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
      }}
    >
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

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                marginLeft: "900px",
              }}
            >
              {pages.map((page) => (
                <div key={page}>
                  <Button
                    onClick={handleOpenAnnouncementMenu}
                    sx={{
                      my: 2,
                      color: "white",
                      display: "block",
                      cursor: announcementClicked ? "pointer" : "default",
                    }}
                  >
                    {page}
                  </Button>
                  <Menu
                    id="menu-announcement"
                    anchorEl={anchorElAnnouncement}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    open={Boolean(anchorElAnnouncement)}
                    onClose={handleCloseAnnouncementMenu}
                  >
                    {announcements.map((announcement) => (
                      <MenuItem
                        key={announcement}
                        onClick={handleCloseAnnouncementMenu}
                      >
                        {announcement}
                      </MenuItem>
                    ))}
                  </Menu>
                </div>
              ))}
            </Box>

            <Stack
              spacing={4}
              direction="row"
              sx={{ color: "white", marginRight: "20px" }}
            >
              <Badge color="secondary" badgeContent={0}>
                <NotificationsIcon />
              </Badge>
            </Stack>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Thaer" src="ProfileImages/thaer.PNG" />
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
                  <Link
                    to={`/${setting.replace(/\s+/g, "")}`}
                    key={setting}
                    style={{ textDecoration: "none" }}
                  >
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
      </div>
      <div
        style={{
          font: "60px  black  solid",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "320px",
          fontFamily: "Georgia",
        }}
      >
        <div style={{ marginBottom: "8px" }}>Hello,</div>
        <div style={{ marginBottom: "8px" }}>{lecturers[0].name}</div>
      </div>
    </div>
  );
};

export default LecturerHome;
