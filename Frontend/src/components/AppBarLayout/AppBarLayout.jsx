import React, { useState } from "react";
import {
  AppBar,
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CampaignIcon from "@mui/icons-material/Campaign";
import { styled } from "@mui/system";
import Menu1 from "../Account Menu/Menu1";

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
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const onSetAnchorElUser = (closedAnchor) => setAnchorElUser(closedAnchor);

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

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
    setOpenMenu(true);
  };

  const handleOpenAnnouncementMenu = (event) => {
    setAnchorElAnnouncement(event.currentTarget);
  };

  const handleCloseAnnouncementMenu = () => {
    setAnchorElAnnouncement(null);
  };

  const handleOpenDialogFromTitle = (index) => {
    setSelectedAnnouncement(announcements[index]);
    setDialogOpen(true);
    setAnchorElAnnouncement(null);
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
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
              </Box>
              <Stack direction="row">
                <Menu1
                  openMenu={openMenu}
                  anchor={anchorElUser}
                  onSetAnchorElUser={onSetAnchorElUser}
                />
              </Stack>
            </Toolbar>
          </AppBar>
        </div>
        {/* Dialog for displaying announcement details */}
        <Dialog open={dialogOpen} onClose={handleCloseDialog}>
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
      </div>
    </>
  );
};

export default AppBarLayout;
