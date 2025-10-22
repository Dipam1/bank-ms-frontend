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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { DataContext } from '../contexts/DataContext';

const LoansPage = () => {
  const { loans, fetchLoans, applyForLoan, repayLoan, userInfo } = useContext(DataContext);
  const [repayAmount, setRepayAmount] = useState('');
  const [selectedLoanId, setSelectedLoanId] = useState('');
  const [applyAmount, setApplyAmount] = useState('');
  const [applyTerm, setApplyTerm] = useState('');
  const [loanType, setLoanType] = useState('PERSONAL');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    if (userInfo) {
      fetchLoans();
    }
  }, [userInfo]);

  const handleRepayLoan = async (e) => {
    e.preventDefault();
    try {
      await repayLoan(selectedLoanId, repayAmount);
      setSnackbarMessage('Loan repaid successfully!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      setRepayAmount('');
      setSelectedLoanId('');
    } catch (error) {
      setSnackbarMessage('Loan repayment failed.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleApplyForLoan = async (e) => {
    e.preventDefault();
    try {
      await applyForLoan({
        amount: applyAmount,
        termMonths: applyTerm,
        loanType: loanType,
      });
      setSnackbarMessage('Loan application submitted successfully!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      setApplyAmount('');
      setApplyTerm('');
    } catch (error) {
      setSnackbarMessage('Loan application failed.');
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
        {/* My Loans */}
        <Grid item xs={12}>
          <Paper style={{ padding: '2rem' }}>
            <Typography variant="h5" gutterBottom>
              My Loans
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Loan ID</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Due Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loans.length > 0 ? (
                    loans.map((loan) => (
                      <TableRow key={loan.id}>
                        <TableCell>{loan.id}</TableCell>
                        <TableCell>${loan.amount.toFixed(2)}</TableCell>
                        <TableCell>{loan.status}</TableCell>
                        <TableCell>{new Date(loan.dueDate).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        No loans found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Apply for a Loan */}
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '2rem' }}>
            <Typography variant="h5" gutterBottom>
              Apply for a Loan
            </Typography>
            <form onSubmit={handleApplyForLoan}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Loan Amount"
                    type="number"
                    value={applyAmount}
                    onChange={(e) => setApplyAmount(e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Term (Months)"
                    type="number"
                    value={applyTerm}
                    onChange={(e) => setApplyTerm(e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>Loan Type</InputLabel>
                    <Select
                      value={loanType}
                      onChange={(e) => setLoanType(e.target.value)}
                    >
                      <MenuItem value="PERSONAL">Personal</MenuItem>
                      <MenuItem value="HOME">Home</MenuItem>
                      <MenuItem value="AUTO">Auto</MenuItem>
                      <MenuItem value="STUDENT">Student</MenuItem>
                    </Select>
                  </FormControl>
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

        {/* Repay a Loan */}
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '2rem' }}>
            <Typography variant="h5" gutterBottom>
              Repay a Loan
            </Typography>
            <form onSubmit={handleRepayLoan}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Loan ID"
                    value={selectedLoanId}
                    onChange={(e) => setSelectedLoanId(e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Amount"
                    type="number"
                    value={repayAmount}
                    onChange={(e) => setRepayAmount(e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="secondary" fullWidth>
                    Repay
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

export default LoansPage;
