import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";

function LecturersProfile() {
  const defaultTheme = createTheme();

  const images = [
    "ProfileImages/thaer.png",
    "ProfileImages/mohmad.png",
    "ProfileImages/nael.png",
    "ProfileImages/anas.png",
    "ProfileImages/yousef.png",
    "ProfileImages/yazeed.png",
    "ProfileImages/rami.png",
    "ProfileImages/osamah.png",
    "ProfileImages/osamas.png",
    "ProfileImages/nagham.png",
    "ProfileImages/shatha.png",
    "ProfileImages/maha.png",
    "ProfileImages/deema.png",
  ];

  const headings = [
    "Dr.Thaer Samar",
    "Dr.Mohammed Khalil",
    "Dr.Nael Salman",
    "Dr.Anas Melhem",
    "Dr.Yousef Daraghmi",
    "Dr.Yazeed Sleet",
    "Dr.Rami Yousef",
    "Dr.Osama Hamed",
    "Dr.Osama Safarini",
    "Dr.Nagham Hamad",
    "Dr.Shada Abushanab",
    "Dr.May Zakarneh",
    "Dr.Dema Sawalha",
  ];

  const views = [
    "Assistant Professor\nRoom Number: H313\n+970 9 2688199\nthaer.sammar@ptuk.edu.ps",
    "Assistant Professor\nRoom Number: H316\n+970 9 2688199\nm.khalil@ptuk.edu.ps",
    "Assistant Professor\nRoom Number: H314\n+970 9 2688199\nn.salman@ptuk.edu.ps",
    "Assistant Professor\nRoom Number: H307\n+970 9 2688199\na.melhem@ptuk.edu.ps",
    "Associate Professor\nRoom Number: H312\n+970 9 2688199\ny.awwad@ptuk.edu.ps",
    "Lecturer\nRoom Number: H311\n+970 9 2688199\ny.sleet@ptuk.edu.ps",
    "Assistant Professor\nRoom Number:\n+970 9 2688199\nr.yousuf@ptuk.edu.ps",
    "Assistant Professor\nRoom Number:\n+970 9 2688199\nosama.hamed@ptuk.edu.ps",
    "Assistant Professor\nRoom Number:\n+970 9 2688199\nosama.safarini@ptuk.edu.ps",
    "Engineering Lecturer\nRoom Number:\n+970 9 2688199\nnagham.hamad@ptuk.edu.ps",
    "Assistant Professor\nRoom Number: H310\n+970 9 2688199\nshatha.abushanab@ptuk.edu.ps",
    "Lecturer\nRoom Number:\n+970 9 2688199\nm.zakarneh@ptuk.edu.ps",
    "Lecturer\nRoom Number:\n+970 9 2688199\ndema.sawalha@ptuk.edu.ps",
  ];
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filteredLecturers, setFilteredLecturers] = React.useState(headings);
  const [viewMode, setViewMode] = React.useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const { sideBar, setSideBar } = useAuth();

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      const query = event.target.value;
      setSearchQuery(query);

      const filtered = headings.filter((lecturer) =>
        lecturer.toLowerCase().includes(query.toLowerCase())
      );

      setFilteredLecturers(filtered);

      const firstMatchingIndex = headings.findIndex((lecturer) =>
        lecturer.toLowerCase().includes(query.toLowerCase())
      );

      if (firstMatchingIndex !== -1) {
        const cardElement = document.getElementById(
          `lecturer-card-${firstMatchingIndex}`
        );
        if (cardElement) {
          cardElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setFilteredLecturers(headings);
  };

  const handleView = (index) => {
    setViewMode(index);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setViewMode(null);
    setOpenDialog(false);
  };

  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleAddAppointmentClick = () => {
    // Use navigate instead of push
    navigate("/me/BookAppointment");
  };
  const handleDrawerOpen = () => {
    setSideBar((previous) => !previous);
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      {/* <AppBar
        position="static"
        style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000 }}
        sx={{ background: "#1f3f66" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
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
          <div style={{ display: "flex", alignItems: "center" }}>
            {searchQuery && (
              <IconButton onClick={handleClearSearch}>
                <CloseIcon sx={{ color: "white" }} />
              </IconButton>
            )}
            <SearchIcon sx={{ color: "white" }} />
            <InputBase
              placeholder="Search..."
              inputProps={{ "aria-label": "search" }}
              sx={{ color: "white", marginLeft: "8px" }}
              onKeyDown={handleSearch}
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </div>
        </Toolbar>
      </AppBar> */}
      <main>
        <Box>
          <Container>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography
                component="h1"
                variant="h2"
                color="#1f3f66"
                style={{
                  textAlign: "left",
                  fontFamily: "Garamond",
                  marginRight: "100px", // Adjust the margin as needed
                }}
              >
                Lecturers Profile
              </Typography>

              <Box
                style={{
                  border: "1px solid #1f3f66",
                  width: "55%",
                  height: "55%",
                  padding: "5px",
                  borderRadius: "5px",
                  marginTop: "5px",
                }}
              >
                {searchQuery && (
                  <IconButton onClick={handleClearSearch}>
                    <CloseIcon sx={{ color: "#1f3f66" }} />
                  </IconButton>
                )}
                <SearchIcon sx={{ color: "#1f3f66" }} />
                <InputBase
                  placeholder="Search..."
                  inputProps={{ "aria-label": "search" }}
                  sx={{ color: "#1f3f66", marginLeft: "8px" }}
                  onKeyDown={handleSearch}
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                />
              </Box>
            </div>
          </Container>
        </Box>
        <Container sx={{ py: 3 }}>
          {filteredLecturers.length === 0 ? (
            <Typography
              variant="h2"
              align="center"
              color="text.primary"
              style={{
                textAlign: "center",
                fontFamily: "Garamond",
                color: "red",
              }}
            >
              No Result
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {filteredLecturers.map((lecturer, index) => (
                <Grid item key={lecturer} xs={2} sm={6} md={3} lg={2}>
                  <Card
                    id={`lecturer-card-${index}`}
                    sx={{
                      height: "100%",
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      component="div"
                      sx={{
                        pt: "100%", // Adjust the height of the image here
                        backgroundImage: `url(/${images[index]})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="h2"
                        style={{ fontFamily: "Sarfi" }}
                      >
                        {lecturer}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        onClick={() => handleView(index)}
                        style={{ color: "#1f3f66" }}
                      >
                        View
                      </Button>
                      <Button
                        size="small"
                        onClick={handleAddAppointmentClick}
                        style={{ color: "#1f3f66" }}
                      >
                        Book Now
                      </Button>
                    </CardActions>
                    <Dialog
                      open={viewMode === index}
                      onClose={handleCloseDialog}
                    >
                      <DialogTitle>{lecturer}</DialogTitle>
                      <DialogContent>
                        <CardContent>
                          {/* Additional information goes here */}
                          <List>
                            {views[index].split("\n").map((line, i) => (
                              <ListItem key={i}>
                                <ListItemIcon>
                                  {i === 0 && <AccountBalanceIcon />}
                                  {i === 1 && <ApartmentIcon />}
                                  {i === 2 && <PhoneIcon />}
                                  {i === 3 && <EmailIcon />}
                                </ListItemIcon>
                                <ListItemText
                                  primary={
                                    i === 3 ? (
                                      <Link href={`mailto:${line}`}>
                                        {line}
                                      </Link>
                                    ) : (
                                      line
                                    )
                                  }
                                />
                              </ListItem>
                            ))}
                          </List>
                        </CardContent>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleCloseDialog}>Close</Button>
                      </DialogActions>
                    </Dialog>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </main>
    </ThemeProvider>
  );
}

export default LecturersProfile;
