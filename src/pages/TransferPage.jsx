import React, { useState, useContext, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
} from "@mui/material";
import { DataContext } from "../contexts/DataContext";

const TransferPage = () => {
  const { accounts, transfer, fetchAccounts } = useContext(DataContext);
  const [fromAccount, setFromAccount] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleTransfer = async (e) => {
    e.preventDefault();
    try {
      await transfer(fromAccount, toAccount, amount);
      setSnackbarMessage("Transfer successful!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      // Clear formW
      setFromAccount("");
      setToAccount("");
      setAmount("");
    } catch (error) {
      setSnackbarMessage(
        "Transfer failed. Please check the details and try again."
      );
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: "2rem" }}>
        <Typography variant="h4" gutterBottom>
          Transfer Money
        </Typography>
        <form onSubmit={handleTransfer}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth sx={{ minWidth: 190 }}>
                <InputLabel id="from-account-label">From Account</InputLabel>
                <Select
                  labelId="from-account-label"
                  value={fromAccount}
                  onChange={(e) => setFromAccount(e.target.value)}
                  required
                >
                  {accounts.map((account) => (
                    <MenuItem key={account.id} value={account.accountNumber}>
                      {account.accountType} - {account.accountNumber} ($
                      {account.balance.toFixed(2)})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="To Account Number"
                value={toAccount}
                onChange={(e) => setToAccount(e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                fullWidth
                required
                inputProps={{ min: "0.01", step: "0.01" }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Transfer
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default TransferPage;
