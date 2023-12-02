import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

function LecturersProfile() {
  const defaultTheme = createTheme();

  const images = [
    'ProfileImages/thaer.PNG',
    'ProfileImages/mohmad.PNG',
    'ProfileImages/nael.PNG',
    'ProfileImages/anas.PNG',
    'ProfileImages/yousef.PNG',
    'ProfileImages/yazeed.PNG',
    'ProfileImages/rami.PNG',
    'ProfileImages/osamah.PNG',
    'ProfileImages/osamas.PNG',
    'ProfileImages/nagham.PNG',
    'ProfileImages/shatha.PNG',
    'ProfileImages/maha.PNG',
    'ProfileImages/deema.PNG'
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
    "Dr.Dema Sawalha"
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
    "Lecturer\nRoom Number:\n+970 9 2688199\ndema.sawalha@ptuk.edu.ps"
  ];

  const [searchQuery, setSearchQuery] = React.useState('');
  const [filteredLecturers, setFilteredLecturers] = React.useState(headings);
  const [viewMode, setViewMode] = React.useState(null);

  const handleSearch = (event) => {
    if (event.key === 'Enter') {
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
        const cardElement = document.getElementById(`lecturer-card-${firstMatchingIndex}`);
        if (cardElement) {
          cardElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setFilteredLecturers(headings);
  };

  const handleView = (index) => {
    setViewMode(index);
  };

  const handleCloseView = () => {
    setViewMode(null);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
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
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {searchQuery && (
              <IconButton onClick={handleClearSearch}>
                <CloseIcon sx={{ color: 'white' }} />
              </IconButton>
            )}
            <SearchIcon sx={{ color: 'white' }} />
            <InputBase
              placeholder="Search..."
              inputProps={{ 'aria-label': 'search' }}
              sx={{ color: 'white', marginLeft: '8px' }}
              onKeyPress={handleSearch}
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </div>
        </Toolbar>
      </AppBar>
      <main>
        <Box >
          <Container >
            <Typography
              component="h1"
              variant="h2"
              marginTop="66px"
              color="text.primary"
              style={{ 
              textAlign: "left", 
              fontFamily: "Garamond",
              }}
            >
             Lecturers Profile
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 3 }} >
          {filteredLecturers.length === 0 ? (
            <Typography variant="h2" align="center" color="text.primary"  style={{ textAlign: "center", fontFamily: "Garamond", color :"red" }}>
              No Result 
            </Typography>
          ) : (
            <Grid container spacing={6}>
              {filteredLecturers.map((lecturer, index) => (
                <Grid item key={lecturer} xs={12} sm={6} md={3} lg={3}>
                  <Card
                    id={`lecturer-card-${index}`}
                    sx={{ height: '100%',width: "111%", display: 'flex', flexDirection: 'column' }}
                  >
                    <CardMedia
                      component="div"
                      sx={{
                        pt: '111%', // Adjust the height of the image here
                        backgroundImage: `url(/${images[index]})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h6" component="h2">
                        {lecturer}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" onClick={() => handleView(index)} style={{backgroundColor:" "}}>
                        View
                      </Button>
                      <Button size="small">Add an Appointment</Button>
                    </CardActions>
                    {viewMode === index && (
                      <CardContent>
                        {/* Additional information goes here */}
                        <List>
                          {views[index].split('\n').map((line, i) => (
                            <ListItem key={i}>
                              <ListItemIcon>
                                {i === 0 && <AccountBalanceIcon />}
                                {i === 1 && <ApartmentIcon />}
                                {i === 2 && <PhoneIcon />}
                                {i === 3 && <EmailIcon />}
                              </ListItemIcon>
                              <ListItemText
                                primary={i === 3 ? <Link href={`mailto:${line}`}>{line}</Link> : line}
                              />
                            </ListItem>
                          ))}
                        </List>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                          <IconButton onClick={handleCloseView}>
                            <CloseIcon />
                          </IconButton>
                        </Box>
                      </CardContent>
                    )}
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
