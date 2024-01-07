import React from "react";
import { Link } from "react-router-dom";
import { Typography, Menu, MenuItem } from "@mui/material";

const Menu1 = ({ openMenu, anchor, onSetAnchorElUser }) => {
  const settings1 = [
    "LectureProfile",
    "EditProfile",
    "PostAnnouncement",
    "AddAppointment",
    // "ArchivePage",
    // "Logout",
  ];

  const handleCloseUserMenu = () => {
    onSetAnchorElUser(false);
  };

  return (
    openMenu && (
      <div>
        <Menu
          id="menu-appbar"
          anchorEl={anchor}
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
            <MenuItem key={setting}>
              <Link
                to={`/me/${setting}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <Typography>{setting}</Typography>
              </Link>
            </MenuItem>
          ))}
        </Menu>
      </div>
    )
  );
};

export default Menu1;
