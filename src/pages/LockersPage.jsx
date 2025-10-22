import React, { useState, useEffect, useContext } from 'react';
import {
  Typography,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  Snackbar,
  Alert,
} from '@mui/material';
import { DataContext } from '../contexts/DataContext';

const LockersPage = () => {
  const {
    availableLockers,
    fetchAvailableLockers,
    myLocker,
    fetchMyLocker,
    assignLocker,
    userInfo,
  } = useContext(DataContext);

  const [assignLockerId, setAssignLockerId] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    if (userInfo) {
      fetchAvailableLockers();
      fetchMyLocker();
    }
  }, [userInfo]);

  const handleAssignSubmit = async (e) => {
    e.preventDefault();
    try {
      await assignLocker(assignLockerId);
      setSnackbarMessage('Locker assigned successfully!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      setAssignLockerId('');
    } catch (error) {
      setSnackbarMessage('Failed to assign locker.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Lockers
      </Typography>
      <Grid container spacing={3}>
        {/* My Locker */}
        <Grid item xs={12}>
          <Paper style={{ padding: '2rem' }}>
            <Typography variant="h5" gutterBottom>
              My Locker
            </Typography>
            {myLocker ? (
              <Typography>
                Locker Number: {myLocker.lockerNumber}, Location: {myLocker.location}
              </Typography>
            ) : (
              <Typography>No locker assigned.</Typography>
            )}
          </Paper>
        </Grid>

        {/* Available Lockers */}
        <Grid item xs={12}>
          <Paper style={{ padding: '2rem' }}>
            <Typography variant="h5" gutterBottom>
              Available Lockers
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Locker ID</TableCell>
                    <TableCell>Locker Number</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Size</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {availableLockers.length > 0 ? (
                    availableLockers.map((locker) => (
                      <TableRow key={locker.id}>
                        <TableCell>{locker.id}</TableCell>
                        <TableCell>{locker.lockerNumber}</TableCell>
                        <TableCell>{locker.location}</TableCell>
                        <TableCell>{locker.size}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        No available lockers.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Assign a Locker */}
        <Grid item xs={12}>
          <Paper style={{ padding: '2rem' }}>
            <Typography variant="h5" gutterBottom>
              Assign a Locker
            </Typography>
            <form onSubmit={handleAssignSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Locker ID"
                    name="lockerId"
                    value={assignLockerId}
                    onChange={(e) => setAssignLockerId(e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    Assign
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default LockersPage;
