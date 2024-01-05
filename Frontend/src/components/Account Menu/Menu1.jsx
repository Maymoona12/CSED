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

// const StyledButton = styled(Button)({
//   my: 2,
//   color: "white",
//   display: "block",
// });

// const StyledStack = styled(Stack)({
//   color: "white",
// });

const Menu1 = ({ openMenu, anchor }) => {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const settings1 = [
    "Lecture Profile",
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
    console.log("...");
  };
  console.log(openMenu);
  return (
    openMenu && (
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <div>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchor={anchor}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={openMenu}
            onClose={handleCloseUserMenu}
          >
            {settings1.map((setting) => (
              <Link
                to={`/me/{setting}`}
                key={setting}
                style={{ textDecoration: "none" }}
              >
                <MenuItem>
                  <Typography textAlign="center" sx={{ color: "black" }}>
                    {setting}
                  </Typography>
                </MenuItem>
              </Link>
            ))}
          </Menu>
        </div>
      </div>
    )
  );
};
export default Menu1;
