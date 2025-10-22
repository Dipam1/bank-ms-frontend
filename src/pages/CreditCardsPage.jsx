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

const CreditCardsPage = () => {
  const {
    creditCards,
    fetchCreditCards,
    applyForCreditCard,
    makeCreditCardPayment,
    userInfo,
  } = useContext(DataContext);

  const [applyData, setApplyData] = useState({ fromAccountNumber: '', toAccountNumber: '', amount: '' });
  const [paymentData, setPaymentData] = useState({ creditLimit: '' });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    if (userInfo) {
      fetchCreditCards();
    }
  }, [userInfo]);

  const handleApplyChange = (e) => {
    setApplyData({ ...applyData, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
  };

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    try {
      await applyForCreditCard(applyData);
      setSnackbarMessage('Credit card application submitted successfully!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      setApplyData({ fromAccountNumber: '', toAccountNumber: '', amount: '' });
    } catch (error) {
      setSnackbarMessage('Credit card application failed.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    try {
      await makeCreditCardPayment(paymentData);
      setSnackbarMessage('Payment successful!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      setPaymentData({ creditLimit: '' });
    } catch (error) {
      setSnackbarMessage('Payment failed.');
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
      <Grid container spacing={3}>
        {/* My Credit Cards */}
        <Grid item xs={12}>
          <Paper style={{ padding: '2rem' }}>
            <Typography variant="h5" gutterBottom>
              My Credit Cards
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Card Number</TableCell>
                    <TableCell>Card Holder</TableCell>
                    <TableCell>Expiry Date</TableCell>
                    <TableCell>Balance</TableCell>
                    <TableCell>Credit Limit</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {creditCards.length > 0 ? (
                    creditCards.map((card) => (
                      <TableRow key={card.id}>
                        <TableCell>{card.cardNumber}</TableCell>
                        <TableCell>{card.cardHolderName}</TableCell>
                        <TableCell>{new Date(card.expiryDate).toLocaleDateString()}</TableCell>
                        <TableCell>${card.balance.toFixed(2)}</TableCell>
                        <TableCell>${card.creditLimit.toFixed(2)}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        No credit cards found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Apply for a Credit Card */}
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '2rem' }}>
            <Typography variant="h5" gutterBottom>
              Apply for a Credit Card
            </Typography>
            <form onSubmit={handleApplySubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="From Account Number"
                    name="fromAccountNumber"
                    value={applyData.fromAccountNumber}
                    onChange={handleApplyChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="To Account Number"
                    name="toAccountNumber"
                    value={applyData.toAccountNumber}
                    onChange={handleApplyChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Amount"
                    name="amount"
                    type="number"
                    value={applyData.amount}
                    onChange={handleApplyChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    Apply
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>

        {/* Make a Payment */}
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '2rem' }}>
            <Typography variant="h5" gutterBottom>
              Make a Payment
            </Typography>
            <form onSubmit={handlePaymentSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Credit Limit"
                    name="creditLimit"
                    type="number"
                    value={paymentData.creditLimit}
                    onChange={handlePaymentChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="secondary" fullWidth>
                    Pay
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

export default CreditCardsPage;
