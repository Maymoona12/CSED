import React, { useState, useEffect } from "react";
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
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Badge from "@mui/material/Badge";
import useNotification from "./useNotification";
import useReject from "../../pages/UsersPage/Home/useReject";
import usebookedAppointment from "../../pages/UsersPage/Home/useBookedApp";
import useNotifiAnn from "./useindexNotifiAnn";

const StyledButton = styled(Button)({
  my: 2,
  color: "white",
  display: "block",
});

const StyledStack = styled(Stack)({
  color: "white",
});

const AppBarLayout = () => {
  const renderDoctorNotifications = () => {
    return Object.keys(notifications || {}).map((groupIndex) => {
      const notificationGroup = notifications[groupIndex];
      console.log("notificationGroup:", notificationGroup);

      return Object.values(notificationGroup).map((notify, index) => {
        console.log("notify:", notify);

        const sname = notify?.data?.["student_name"]?.[0]?.name;
        const atime = notify?.data?.time;
        const aday = notify?.data?.day;
        const idNo = notify?.id;

        return (
          <MenuItem
            key={notify?.id}
            onClick={() => {
              console.log("Notification clicked:", notify);
              handleOpenDialogFromNotification(index, sname, atime, aday, idNo);
            }}
          >
            An appointment was booked by: {sname}
          </MenuItem>
        );
      });
    });
  };

  const renderStudentNotifications = () => {
    return Object.values(notifications || {}).map((notificationGroup) =>
      Object.values(notificationGroup).map((notify, index) => {
        const adoctor = notify?.data?.doctor_name;
        const atime2 = notify?.data?.start_time;
        const aday2 = notify?.data?.day;

        return (
          <MenuItem
            key={notify?.id}
            onClick={() =>
              handleOpenDialogFromNotificationStudent(
                index,
                adoctor,
                aday2,
                atime2
              )
            }
          >
            An appointment was declined by: {notify?.data?.doctor_name}
          </MenuItem>
        );
      })
    );
  };

  const renderAnnNotifications = () => {
    const firstElement = notifiAnn?.[0];

    if (
      !Array.isArray(notifiAnn) ||
      !firstElement ||
      !Array.isArray(firstElement)
    ) {
      return <MenuItem>No announcements available</MenuItem>;
    }

    return firstElement.map((notifi, index) => {
      const atitle = notifi?.data?.title;
      const atext = notifi?.data?.text_ann;
      const afile = notifi?.data?.file;

      return (
        <MenuItem
          key={`announcement-${index}`}
          onClick={() => handleOpenDialogFromTitle(index, atitle, atext, afile)}
        >
          {atitle}
        </MenuItem>
      );
    });
  };

  // Rest of your code remains unchanged

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElAnnouncement, setAnchorElAnnouncement] = useState(null);
  const [dialogOpenAnnouncement, setDialogOpenAnnouncement] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [anchorElNotification, setAnchorElNotification] = useState(null);
  const [dialogOpenNotification, setDialogOpenNotification] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [anchorElNotificationStudent, setAnchorElNotificationStudent] =
    useState(null);
  const [dialogOpenNotificationStudent, setDialogOpenNotificationStudent] =
    useState(false);
  const [selectedNotificationStudent, setSelectedNotificationStudent] =
    useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const onSetAnchorElUser = (closedAnchor) => setAnchorElUser(closedAnchor);
  const open = Boolean(anchorElUser);
  const { logoutOperation } = useLogout();
  const { getUser, sideBar, setSideBar } = useAuth();
  const user = getUser();
  const { notifications } = useNotification();
  const { booked } = usebookedAppointment();
  const { mutate: reject } = useReject();
  const [name, setName] = useState(" ");
  const [day, setDay] = useState(" ");
  const [time, setTime] = useState(" ");
  const [dname, setDname] = useState(" ");
  const [day2, setDay2] = useState(" ");
  const [time2, setTime2] = useState(" ");
  const [notifi_id, setNotifiId] = useState(" ");
  // const { notifiAnn } = useNotifiAnn();
  const { notifiAnn, isError } = useNotifiAnn();

  const [title, setTitle] = useState(" ");
  const [text, setText] = useState(" ");
  const [file, setFile] = useState(" ");
  const fileExtension = file.split(".").pop().toLowerCase();
  const isImage = ["jpg", "jpeg", "png", "gif", "bmp"].includes(fileExtension);
  const isDocument = ["pdf", "doc", "docx", "txt", "pptx"].includes(
    fileExtension
  );

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
    console.log("notifiAnn:", notifiAnn);

    setAnchorElAnnouncement(event.currentTarget);
  };

  const handleCloseAnnouncementMenu = () => {
    setAnchorElAnnouncement(null);
  };

  const handleOpenDialogFromTitle = (index, atitle, atext, afile) => {
    setSelectedAnnouncement(index);
    setDialogOpenAnnouncement(true);
    setAnchorElAnnouncement(null);
    setText(atext);
    setTitle(atitle);
    setFile(afile);
  };

  const handleCloseDialog = () => {
    setDialogOpenAnnouncement(false);
    setDialogOpenNotification(false);
    setDialogOpenNotificationStudent(false);
  };

  const handleOpenNotificationMenu = (event) => {
    console.log("Notification menu opened");
    setAnchorElNotification(event.currentTarget);
  };

  const handleCloseNotificationMenu = () => {
    setAnchorElNotification(null);
  };

  const handleOpenDialogFromNotification = (
    index,
    sname,
    atime,
    aday,
    idNo
  ) => {
    console.log(
      "Opening dialog for doctor notification",
      index,
      sname,
      atime,
      aday
    );

    setSelectedNotification(index);
    setDialogOpenNotification(true);
    setAnchorElNotification(null);
    setName(sname);
    setTime(atime);
    setDay(aday);
    setNotifiId(idNo);
  };

  const handleOpenDialogFromNotificationStudent = (
    index,
    adoctor,
    aday2,
    atime2
  ) => {
    console.log(
      "Opening dialog for student notification",
      index,
      adoctor,
      aday2,
      atime2
    );

    setSelectedNotificationStudent(index);
    setDialogOpenNotificationStudent(true);
    setAnchorElNotificationStudent(null);
    setDname(adoctor);
    setDay2(aday2);
    setTime2(atime2);

    // Rest of your code
  };

  const handleLogout = () => {
    // localStorage.clear();
    logoutOperation();
    handleCloseUserMenu();
  };

  const handleDrawerOpen = () => {
    setSideBar((previous) => !previous);
  };
  const handelRejectApp = (event, id, notifi_id) => {
    event.preventDefault();
    reject({ id, notifi_id });
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
                  sx={{ color: "white" }}
                >
                  {user?.role === "doctor" || user?.role === "admin" ? (
                    <StyledButton onClick={handleOpenNotificationMenu}>
                      <Badge variant="dot" color="info">
                        <NotificationsIcon />
                      </Badge>
                    </StyledButton>
                  ) : (
                    <StyledButton onClick={handleOpenNotificationMenu}>
                      <Badge variant="dot" color="info">
                        <NotificationsIcon />
                      </Badge>
                    </StyledButton>
                  )}
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
                  {(user?.role === "doctor" || user?.role === "admin") &&
                  Array.isArray(notifications)
                    ? renderDoctorNotifications()
                    : Array.isArray(notifications)
                    ? renderStudentNotifications()
                    : null}
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
                  sx={{
                    color: "white",
                    marginRight: "20px",
                  }}
                >
                  <StyledButton onClick={handleOpenAnnouncementMenu}>
                    <Badge variant="dot" color="info">
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
                  {notifiAnn?.length > 0 && renderAnnNotifications()}
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
        {/* Dialog for announcement details */}
        <Dialog open={dialogOpenAnnouncement} onClose={handleCloseDialog}>
          <DialogTitle>Title is: {title}</DialogTitle>
          <DialogContent>
            <Typography>Text: {text}</Typography>

            <Paper elevation={3} style={{ padding: "10px", marginTop: "20px" }}>
              <Typography>
                Attachment:
                {isDocument ? (
                  <a
                    href={`/public/Images/${file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {file}
                  </a>
                ) : null}
              </Typography>
              {isImage ? (
                <img
                  src={`/public/Images/${file}`}
                  alt="Announcement"
                  style={{
                    maxWidth: "80%",
                    border: "1px solid #ccc",
                    marginTop: "10px",
                  }}
                />
              ) : null}
            </Paper>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Close</Button>
          </DialogActions>
        </Dialog>

        {/* Dialog for notification details */}
        {user?.role === "doctor" || user?.role === "admin" ? (
          <Dialog open={dialogOpenNotification} onClose={handleCloseDialog}>
            <DialogTitle style={{ fontWeight: "bold" }}>
              An appointment was booked by: {name}
            </DialogTitle>
            <DialogContent>
              <Typography style={{ fontWeight: "bold" }}>Day: {day}</Typography>
              <Typography style={{ fontWeight: "bold" }}>
                Time: {time}
              </Typography>
            </DialogContent>
            <DialogActions>
              {booked?.map((book, index) => (
                <Button
                  key={`${book.id}-${index}`}
                  style={{
                    marginLeft: "70%",
                    marginTop: "5px",
                    fontSize: "16px",
                    color: "#da717e",
                    minWidth: "100px",
                    height: "50px",
                    padding: "20px",
                  }}
                  onClick={(event) =>
                    handelRejectApp(event, book.id, notifi_id)
                  }
                >
                  Decline
                  <HighlightOffIcon
                    style={{
                      marginBottom: "1px",
                      fontSize: "20px",
                      marginLeft: "5px",
                      color: "#da717e",
                    }}
                  />
                </Button>
              ))}
              <Button onClick={handleCloseDialog}>Close</Button>
            </DialogActions>
          </Dialog>
        ) : (
          <Dialog
            open={dialogOpenNotificationStudent}
            onClose={handleCloseDialog}
          >
            <DialogTitle style={{ fontWeight: "bold", color: "#1f3f66" }}>
              An appointment was declined by: {dname}
            </DialogTitle>
            <DialogContent>
              <Typography
                style={{
                  color: "#1f3f66",
                  fontSize: "15px",
                  fontWeight: "bold",
                }}
              >
                Your apoointment has been declined at:
              </Typography>{" "}
              <Typography style={{ fontWeight: "bold", color: "#1f3f66" }}>
                {" "}
                At Day: {day2}
              </Typography>
              <Typography style={{ fontWeight: "bold", color: "#1f3f66" }}>
                Start time: {time2}
              </Typography>{" "}
              <Typography
                style={{
                  fontWeight: "bold",
                  color: "#555b63",
                }}
              >
                Please book another appointment.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleCloseDialog}
                style={{ fontWeight: "bold", color: "#1f3f66" }}
              >
                Close
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </div>
    </>
  );
};

export default AppBarLayout;
