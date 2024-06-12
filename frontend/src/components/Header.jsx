import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { UserContext } from '../context/UserContext';

export default function ButtonAppBar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { userInfo, setUserInfo } = useContext(UserContext);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleLogout = () => {
    setUserInfo(null);
  };

  const drawerList = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button component={Link} to="/create-posts">
          <ListItemText primary="Create Post" />
        </ListItem>
      </List>
      <Divider />
      <List>
        {userInfo ? (
          <ListItem button onClick={handleLogout}>
            <ListItemText primary="Sign out" />
          </ListItem>
        ) : (
          <>
            <ListItem button component={Link} to="/login">
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem button component={Link} to="/register">
              <ListItemText primary="Sign up" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: 'gray' }}>
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}
          >
            Blogs
          </Typography>
          {userInfo && (
            <Button
              color="inherit"
              component={Link}
              to="/create-posts"
              sx={{ display: { xs: 'none', md: 'block' } }}
            >
              Create Post
            </Button>
          )}
          {userInfo ? (
            <Button color="inherit" sx={{ display: { xs: 'none', md: 'block' } }} onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Button color="inherit" sx={{ display: { xs: 'none', md: 'block' } }} component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" sx={{ display: { xs: 'none', md: 'block' } }} component={Link} to="/register">
                Sign up
              </Button>
            </>
          )}
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            sx={{ ml: 2, display: { xs: 'block', md: 'none' } }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        {drawerList()}
      </Drawer>
    </Box>
  );
}
