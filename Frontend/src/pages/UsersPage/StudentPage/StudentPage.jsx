import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Avatar,
  Typography,
  Box,
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import ListItemIcon from "@mui/material/ListItemIcon";
import Stack from "@mui/material/Stack";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import "./style.css";

const StudentPage = () => {
  //   const [editMode, setEditMode] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const settings = [
    "Profile",
    "Edit Password",
    "Lecturers Profile",
    "Archive Page",
    "Logout",
  ];

  const lecturers = [
    {
      name: "Fatima Omar ",
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
    <div
      style={{
        marginBottom: "20px",
        display: "flex",
        justifyContent: "space-between",
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
                  <Link to={`/${setting.replace(/\s+/g, "")}`} key={setting}>
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
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "100vh",
            marginLeft: "40vh",
          }}
        >
          <Typography
            variant="h4"
            component="div"
            style={{
              marginBottom: "8px",
              marginRight: "8px",
              color: "black",
              fontFamily: "Georgia",
            }}
          >
            Hello,
          </Typography>
          <Typography
            variant="h4"
            component="div"
            style={{
              marginBottom: "8px",
              color: "black",
              fontFamily: "Georgia",
            }}
          >
            {lecturers[0].name}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default StudentPage;
