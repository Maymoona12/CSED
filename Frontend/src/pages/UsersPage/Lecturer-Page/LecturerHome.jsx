import React, { useState } from "react";

const LecturerHome = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);

  return (
    <div
      style={{
        marginBottom: "20px",
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
      }}
    >
      {/* <div>
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

            <StyledStack spacing={2} direction="row" sx={{ color: "white" }}>
              <Badge color="secondary" badgeContent={0}>
                <NotificationsIcon />
              </Badge>
            </StyledStack>

            <Box
              sx={{
                flexGrow: 0,
                display: { xs: "none", md: "flex" },
              }}
            >
              <StyledStack
                spacing={2}
                direction="row"
                sx={{ color: "white", marginTop: "10px" }}
              >
                <StyledButton onClick={handleOpenAnnouncementMenu}>
                  <CampaignIcon />
                </StyledButton>
              </StyledStack>

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
                {announcements.map((announcement, index) => (
                  <MenuItem
                    key={announcement.title}
                    onClick={() => handleOpenDialogFromTitle(index)}
                  >
                    {announcement.title}
                  </MenuItem>
                ))}
              </Menu>
            </Box>

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
      </div> */}
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
