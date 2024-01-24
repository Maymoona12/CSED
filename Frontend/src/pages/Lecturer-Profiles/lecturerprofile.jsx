import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
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
import uselecturersprofile from "./uselecturersprofile";
import useBookAppointment from "../Appointment/useBookAppointmet";

function LecturersProfile() {
  const defaultTheme = createTheme();
  const { doctors } = uselecturersprofile();
  const { book } = useBookAppointment();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filteredLecturers, setFilteredLecturers] = React.useState(doctors);
  const [viewMode, setViewMode] = React.useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const cardRefs = React.useRef([]);
  const [matchingIndices, setMatchingIndices] = React.useState([]);

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      const query = event.target.value.toLowerCase();
      setSearchQuery(query);

      const filteredDoctors = doctors?.filter((doctor) =>
        doctor.name.toLowerCase().includes(query)
      );

      setFilteredLecturers(filteredDoctors);

      // set the matching indices
      const matchingIndices = filteredDoctors.map((doctor) =>
        doctors.findIndex((d) => d === doctor)
      );
      setMatchingIndices(matchingIndices);

      // scroll to the first matching card
      if (matchingIndices.length > 0) {
        const firstMatchingIndex = matchingIndices[0];
        const cardElement = cardRefs.current[firstMatchingIndex];
        if (cardElement) {
          cardElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setFilteredLecturers(doctors);
    setMatchingIndices([]); // clear matching indices
  };

  const handleView = (index) => {
    setViewMode(index);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setViewMode(null);
    setOpenDialog(false);
  };

  const navigate = useNavigate();

  const handleAddAppointmentClick = (index) => {
    if (doctors[index]?.doctor_id) {
      navigate(`/me/BookAppointment`);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
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
                  marginRight: "100px",
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
          {filteredLecturers?.length === 0 ? (
            <Typography
              variant="h2"
              align="center"
              color="text.primary"
              style={{
                textAlign: "center",
                marginTop: "10%",
                marginLeft: "50%",
                fontFamily: "Garamond",
                color: "red",
              }}
            >
              No Result!
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {doctors?.map((doctor, index) => (
                <Grid
                  item
                  key={`${doctor.id}-${index}`}
                  xs={2}
                  sm={6}
                  md={3}
                  lg={2}
                >
                  <Card
                    ref={(el) => (cardRefs.current[index] = el)}
                    id={`doctor-card-${index}`}
                    sx={{
                      height: "100%",
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      backgroundColor: matchingIndices.includes(index)
                        ? "#ffcccb"
                        : "white",
                    }}
                  >
                    <CardMedia
                      component="div"
                      sx={{
                        pt: "100%",
                        backgroundImage: `url(/ProfileImages/${doctors[index]?.photo})`,
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
                        {doctors[index]?.name}
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
                        onClick={() => handleAddAppointmentClick(index)}
                        style={{ color: "#1f3f66" }}
                      >
                        Book Now
                      </Button>
                    </CardActions>
                    <Dialog
                      open={viewMode === index}
                      onClose={handleCloseDialog}
                    >
                      <DialogTitle>{doctors[index]?.name}</DialogTitle>
                      <DialogContent>
                        <CardContent>
                          {/* Additional information goes here */}
                          <List>
                            <ListItem>
                              <ListItemIcon>
                                <AccountBalanceIcon />
                              </ListItemIcon>
                              <ListItemText>
                                {doctors[index]?.education_level}
                              </ListItemText>
                            </ListItem>

                            <ListItem>
                              <ListItemIcon>
                                <ApartmentIcon />
                              </ListItemIcon>
                              <ListItemText>
                                {doctors[index]?.office_no}
                              </ListItemText>
                            </ListItem>
                            <ListItem>
                              <ListItemIcon>
                                <PhoneIcon />
                              </ListItemIcon>
                              <ListItemText>
                                {doctors[index]?.phone_no}
                              </ListItemText>
                            </ListItem>

                            <ListItem>
                              <ListItemIcon>
                                <EmailIcon />
                              </ListItemIcon>
                              <ListItemText>
                                {doctors[index]?.email}
                              </ListItemText>
                            </ListItem>
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
