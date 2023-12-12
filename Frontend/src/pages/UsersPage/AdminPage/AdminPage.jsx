// Import necessary dependencies and components
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import UsersIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';

// Components for each page
// import HomePage from './pages/HomePage';
// import UsersPage from './pages/UsersPage';
// import SettingsPage from './pages/SettingsPage';

const drawerWidth = 240;

const styles = {
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '8px',
  },
  content: {
    flexGrow: 1,
    padding: '20px',
  },
};

const AdminPage = () => {
  return (
    <div style={styles.root}>
      <CssBaseline />
      <AppBar position="fixed" style={styles.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        style={styles.drawer}
        classes={{ paper: styles.drawerPaper }}
      >
        <div style={styles.toolbar} />
        <Divider />
        <List>
          <ListItem button component={Link} to="/">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={Link} to="/users">
            <ListItemIcon>
              <UsersIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
          <ListItem button component={Link} to="/settings">
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      </Drawer>
      <main style={styles.content}>
        <div style={styles.toolbar} />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/users" component={UsersPage} />
          <Route path="/settings" component={SettingsPage} />
        </Switch>
      </main>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Route path="/" component={AdminPage} />
    </Router>
  );
}
