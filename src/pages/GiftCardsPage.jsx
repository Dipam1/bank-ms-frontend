import React, { useState, useContext } from 'react';
import {
  Typography,
  Container,
  Grid,
  Paper,
  Button,
  TextField,
  Snackbar,
  Alert,
} from '@mui/material';
import { DataContext } from '../contexts/DataContext';

const GiftCardsPage = () => {
  const {
    giftCardBalance,
    createGiftCard,
    deleteGiftCard,
    getGiftCardBalance,
    redeemGiftCard,
  } = useContext(DataContext);

  const [createData, setCreateData] = useState({ cardNumber: '', amount: '' });
  const [checkCardNumber, setCheckCardNumber] = useState('');
  const [redeemData, setRedeemData] = useState({ cardNumber: '', amount: '' });
  const [deleteCardId, setDeleteCardId] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleCreateChange = (e) => {
    setCreateData({ ...createData, [e.target.name]: e.target.value });
  };

  const handleRedeemChange = (e) => {
    setRedeemData({ ...redeemData, [e.target.name]: e.target.value });
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      await createGiftCard(createData);
      setSnackbarMessage('Gift card created successfully!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      setCreateData({ cardNumber: '', amount: '' });
    } catch (error) {
      setSnackbarMessage('Failed to create gift card.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleCheckBalance = async (e) => {
    e.preventDefault();
    try {
      await getGiftCardBalance(checkCardNumber);
      setSnackbarMessage(`Balance checked for card ${checkCardNumber}.`);
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    } catch (error) {
      setSnackbarMessage('Failed to check balance.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleRedeemSubmit = async (e) => {
    e.preventDefault();
    try {
      await redeemGiftCard(redeemData);
      setSnackbarMessage('Gift card redeemed successfully!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      setRedeemData({ cardNumber: '', amount: '' });
    } catch (error) {
      setSnackbarMessage('Failed to redeem gift card.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleDeleteSubmit = async (e) => {
    e.preventDefault();
    try {
      await deleteGiftCard(deleteCardId);
      setSnackbarMessage('Gift card deleted successfully!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      setDeleteCardId('');
    } catch (error) {
      setSnackbarMessage('Failed to delete gift card.');
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
        Gift Cards
      </Typography>
      <Grid container spacing={3}>
        {/* Create Gift Card */}
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '2rem' }}>
            <Typography variant="h5" gutterBottom>
              Create Gift Card
            </Typography>
            <form onSubmit={handleCreateSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Card Number"
                    name="cardNumber"
                    value={createData.cardNumber}
                    onChange={handleCreateChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Amount"
                    name="amount"
                    type="number"
                    value={createData.amount}
                    onChange={handleCreateChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    Create
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>

        {/* Check Balance */}
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '2rem' }}>
            <Typography variant="h5" gutterBottom>
              Check Balance
            </Typography>
            <form onSubmit={handleCheckBalance}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Card Number"
                    value={checkCardNumber}
                    onChange={(e) => setCheckCardNumber(e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    Check
                  </Button>
                </Grid>
              </Grid>
            </form>
            {giftCardBalance !== null && (
              <Typography variant="h6" style={{ marginTop: '1rem' }}>
                Balance: ${giftCardBalance.toFixed(2)}
              </Typography>
            )}
          </Paper>
        </Grid>

        {/* Redeem Gift Card */}
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '2rem' }}>
            <Typography variant="h5" gutterBottom>
              Redeem Gift Card
            </Typography>
            <form onSubmit={handleRedeemSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Card Number"
                    name="cardNumber"
                    value={redeemData.cardNumber}
                    onChange={handleRedeemChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Amount"
                    name="amount"
                    type="number"
                    value={redeemData.amount}
                    onChange={handleRedeemChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="secondary" fullWidth>
                    Redeem
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>

        {/* Delete Gift Card */}
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '2rem' }}>
            <Typography variant="h5" gutterBottom>
              Delete Gift Card
            </Typography>
            <form onSubmit={handleDeleteSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Card ID"
                    value={deleteCardId}
                    onChange={(e) => setDeleteCardId(e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="error" fullWidth>
                    Delete
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

export default GiftCardsPage;
