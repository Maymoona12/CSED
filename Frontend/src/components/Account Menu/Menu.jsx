import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
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
  Button,
} from "@mui/material";

import { styled } from "@mui/system";

const StyledButton = styled(Button)({
  my: 2,
  color: "white",
  display: "block",
});

const StyledStack = styled(Stack)({
  color: "white",
});

const Menu = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const settings1 = [
    "Profile",
    "Edit Profile",
    "Post Announcement",
    "Add Appointment",
    "Archive Page",
    "Logout",
  ];
  const settings2 = [
    "Profile",
    "Lecturers Profile",
    "Archive Page",
    "Change Password",
    "Logout",
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
        justifyContent: "center",
        flexDirection: "row",
      }}
    >
      <div>
        <Toolbar>
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
              {settings1.map((setting) => (
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
      </div>
    </div>
  );
};
export default Menu;
