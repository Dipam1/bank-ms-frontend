import React, { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { TextField, Button, Container, Typography } from '@mui/material';
import Message from '../components/Message';
import './auth.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [messageOpen, setMessageOpen] = useState(false);
  const { login } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
      setMessageOpen(true);
    }
  }, [location.state]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login({ username, password });
      navigate('/');
    } catch (error) {
      // Handle login error (e.g., show a message)
    }
  };

  const handleMessageClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setMessageOpen(false);
  };

  return (
    <div className="auth-container">
      {message && <Message message={message} type="success" onClose={handleMessageClose} open={messageOpen} />}
      <Container maxWidth="xs" className="auth-form">
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default LoginPage;