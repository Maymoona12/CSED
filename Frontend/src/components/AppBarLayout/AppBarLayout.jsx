import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Avatar,
  Typography,
  Box,
  Stack,
  Menu,
  IconButton,
  Tooltip,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CampaignIcon from "@mui/icons-material/Campaign";
import { styled } from "@mui/system";
import useAuth from "../../hooks/useAuth";
import useLogout from "../../api/Logout/useLogout";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Badge from '@mui/material/Badge';

const StyledButton = styled(Button)({
  my: 2,
  color: "white",
  display: "block",
});

const StyledStack = styled(Stack)({
  color: "white",
});

const AppBarLayout = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElAnnouncement, setAnchorElAnnouncement] = useState(null);
  const [dialogOpenAnnouncement, setDialogOpenAnnouncement] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [anchorElNotification, setAnchorElNotification] = useState(null);
  const [dialogOpenNotification, setDialogOpenNotification] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const onSetAnchorElUser = (closedAnchor) => setAnchorElUser(closedAnchor);
  const open = Boolean(anchorElUser);
  const { logoutOperation } = useLogout();
  const { getUser, sideBar, setSideBar } = useAuth();
  const user = getUser();

  const announcements = [
    {
      title: "Title 1",
      text: "Announcement text 1",
      photo: "CoverImages/image1.jpg",
      document: "Assignment 2.pdf",
    },
    {
      title: "Title 2",
      text: "Announcement text 2",
      photo: "CoverImages/image2.jpg",
    },
    {
      title: "Title 3",
      text: "Announcement text 3,Announcement text 3Announcement text 3Announcement text 3Announcement text 3Announcement text 3Announcement text 3Announcement text 3 ",
      document: "Assignment 2.pdf",
    },
  ];

  const notification = [
    {
      title: "An appointment was booked by: Malak ",
      appointmentname: "meet1 ",
      day:"sunday",
      startat:" 11:00 am",
      endat:" 11:20 am",
      student:" Malak",
      reason:" project",


    },
    {
      title: "An appointment was booked by : Fatima ",
      appointmentname: "meet2 ",
      day:"sunday",
      startat:" 11:20 am",
      endat:" 11:40 am",
      student:" Malak",
      reason:" project",

    },
  ];

  // const notificationStudent = [
  //   {
  //     title: "An appointment was declined by: Dr.Yazeed! ",
  //     text:" Your apoointment has been declined ! Please book another appointment ."


  //   },
  //   {
  //     title: "An appointment was declined by: Dr.Nael !",
  //     text:" Your apoointment has been declined ! Please book another appointment ."


  //   },
  // ];

  const settings1 = ["EditProfile", "ChangePassword"];

  const settings2 = ["ChangePassword"];

  const settings3 = ["EditProfile", "ChangePassword"];

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(false);
  };

  const handleOpenAnnouncementMenu = (event) => {
    setAnchorElAnnouncement(event.currentTarget);
  };

  const handleCloseAnnouncementMenu = () => {
    setAnchorElAnnouncement(null);
  };

  const handleOpenDialogFromTitle = (index) => {
    setSelectedAnnouncement(announcements[index]);
    setDialogOpenAnnouncement(true);
    setAnchorElAnnouncement(null);
  };

  const handleCloseDialog = () => {
    setDialogOpenAnnouncement(false);
    setDialogOpenNotification(false);
  };

  const handleOpenNotificationMenu = (event) => {
    setAnchorElNotification(event.currentTarget);
  };

  const handleCloseNotificationMenu = () => {
    setAnchorElNotification(null);
  };

  const handleOpenDialogFromNotification = (index) => {
    setSelectedNotification(notification[index]);
    setDialogOpenNotification(true);
    setAnchorElNotification(null);
  };

  const handleLogout = () => {
    logoutOperation();
    handleCloseUserMenu();
  };

  const handleDrawerOpen = () => {
    setSideBar((previous) => !previous);
  };

  return (
    <>
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
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 1000,
            }}
            sx={{ background: "#1f3f66" }}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, ...(sideBar && { display: "none" }) }}
              >
                {sideBar && (
                  <ChevronLeftIcon
                    fontSize="small"
                    sx={{
                      marginRight: -0.5,
                      fontSize: "1rem",
                    }}
                  />
                )}
                <MenuIcon />
              </IconButton>

              <Typography
                variant="h5"
                component="div"
                sx={{ flexGrow: 1, fontFamily: "Brush Script MT" }}
              >
                CSED
              </Typography>
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
                  <StyledButton onClick={handleOpenNotificationMenu}>
                  <Badge badgeContent={2} color="primary">
                    <NotificationsIcon />
                    </Badge>
                  </StyledButton>
                </StyledStack>
                <Menu
                  id="menu-Notification"
                  anchorEl={anchorElNotification}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNotification)}
                  onClose={handleCloseNotificationMenu}
                >
                  {notification.map((notification, index) => (
                    <MenuItem
                      key={notification.title}
                      onClick={() => handleOpenDialogFromNotification(index)}
                    >
                      {notification.title}
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <Box
                sx={{
                  flexGrow: 0,
                  display: { xs: "none", md: "flex" },
                }}
              >
                <StyledStack
                  spacing={2}
                  direction="row"
                  sx={{ color: "white", marginTop: "10px" , marginRight:"20px"}}
                >
                  <StyledButton onClick={handleOpenAnnouncementMenu}>
                  <Badge badgeContent={3} color="primary">
                    <CampaignIcon />
                    </Badge>
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
                  <IconButton
                    onClick={handleOpenUserMenu}
                    sx={{ p: 0 }}
                    aria-controls={open ? "menu-appbar" : undefined}
                    aria-expanded={open ? "true" : undefined}
                    aria-haspopup="true"
                  >
                    <Avatar alt="User" src={`/ProfileImages/${user?.photo}`} />
                  </IconButton>
                </Tooltip>
              </Box>
              <Stack direction="row">
                <Menu
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
                  open={open}
                  onClose={handleCloseUserMenu}
                  onClick={handleCloseUserMenu}
                  sx={{ mt: 5 }}
                >
                  {user?.role === "doctor" &&
                    settings1.map((setting) => (
                      <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Link
                          to={`/me/${setting}`}
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          <Typography>{setting}</Typography>
                        </Link>
                      </MenuItem>
                    ))}
                  {user?.role === "student" &&
                    settings2.map((setting) => (
                      <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Link
                          to={`/me/${setting}`}
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          <Typography>{setting}</Typography>
                        </Link>
                      </MenuItem>
                    ))}
                  {user?.role === "admin" &&
                    settings3.map((setting) => (
                      <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Link
                          to={`/me/${setting}`}
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          <Typography>{setting}</Typography>
                        </Link>
                      </MenuItem>
                    ))}

                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </Stack>
            </Toolbar>
          </AppBar>
        </div>
        {/* Dialog for displaying announcement details */}
        <Dialog open={dialogOpenAnnouncement} onClose={handleCloseDialog}>
          <DialogTitle>
            {selectedAnnouncement && selectedAnnouncement.title}
          </DialogTitle>
          <DialogContent>
            {selectedAnnouncement && selectedAnnouncement.text && (
              <Typography>{selectedAnnouncement.text}</Typography>
            )}
            {selectedAnnouncement && selectedAnnouncement.photo && (
              <img
                src={selectedAnnouncement.photo}
                alt="Announcement"
                style={{
                  maxWidth: "80%",
                  border: "1px solid #ccc",
                  marginTop: "10px",
                }}
              />
            )}
            {selectedAnnouncement && selectedAnnouncement.document && (
              <Paper
                elevation={3}
                style={{ padding: "10px", marginTop: "20px" }}
              >
                <Typography>
                  Attachment:{" "}
                  <a
                    href={selectedAnnouncement.document}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {selectedAnnouncement.document}
                  </a>
                </Typography>
              </Paper>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Close</Button>
          </DialogActions>
        </Dialog>
        {/* Dialog for displaying Notification details */}
        <Dialog open={dialogOpenNotification} onClose={handleCloseDialog}>
          <DialogTitle>
            {selectedNotification && selectedNotification.title}
          </DialogTitle>
          <DialogContent>
          {selectedNotification && selectedNotification.appointmentname && (
              <Typography>Appointment Name: {selectedNotification.appointmentname}</Typography>
            )}
            {selectedNotification && selectedNotification.day && (
              <Typography>Day: {selectedNotification.day}</Typography>
            )}
            {selectedNotification && selectedNotification.startat && (
              <Typography>Start At: {selectedNotification.startat}</Typography>
            )}
            {selectedNotification && selectedNotification.endat && (
              <Typography>End AT: {selectedNotification.endat}</Typography>
            )}
            {selectedNotification && selectedNotification.reason && (
              <Typography> Reason: {selectedNotification.reason}</Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button
            style={{
              marginRight:"190px",
              marginTop: "5px",
              fontSize: "16px",
              backgroundColor:"#da717e",
              color:"white",
            }}>
                Decline 
                <HighlightOffIcon style={{
                  marginBottom:"1px",
                  fontSize: "20px",
                  marginLeft:"5px",
                  color:"white"
                }}
                />
            </Button>
            <Button onClick={handleCloseDialog}>Close</Button>
          </DialogActions>
        </Dialog>
        {/* Dialog for displaying Notification Student details */}
        {/* <Dialog open={dialogOpenNotification} onClose={handleCloseDialog}>
          <DialogTitle>
            {selectedNotification && selectedNotification.title}
          </DialogTitle>
          <DialogContent>
            {selectedNotification && selectedNotification.text && (
              <Typography Style={{color:"#1f3f66" , fontSize:"16px"}}>{selectedNotification.text}</Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Close</Button>
          </DialogActions>
        </Dialog> */}
      </div>
    </>
  );
};

export default AppBarLayout;
