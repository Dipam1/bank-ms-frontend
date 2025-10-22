import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import './navbar.css';

const Navbar = () => {
  const { token, logout } = useContext(AuthContext);

  return (
    <AppBar style={{background:"#579191ff", position: "relative", zIndex: 2}} position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}>
          Bank App
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        {token ? (
          <>
            <Button color="inherit" component={Link} to="/accounts">Accounts</Button>
            <Button color="inherit" onClick={logout}>Logout</Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/register">Register</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;