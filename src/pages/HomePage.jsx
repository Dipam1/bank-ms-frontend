import React, { useContext, useEffect } from 'react';
import {
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { DataContext } from '../contexts/DataContext';

const HomePage = () => {
  const { userInfo, accounts, fetchAccounts, transactions, fetchTransactions } = useContext(DataContext);

  useEffect(() => {
    fetchAccounts();
  }, []);

  useEffect(() => {
    if (accounts.length > 0) {
      // Fetch transactions for the first account
      fetchTransactions(accounts[0].id);
    }
  }, [accounts]);

  const totalBalance = accounts.reduce((acc, account) => acc + account.balance, 0);

  return (
    <Grid container spacing={3}>
      {/* Welcome Message */}
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Welcome, {userInfo?.username || 'User'}!
        </Typography>
      </Grid>

      {/* Account Summary */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Account Summary
            </Typography>
            <Typography variant="body1">
              Number of Accounts: {accounts.length}
            </Typography>
            <Typography variant="h6" style={{ marginTop: '1rem' }}>
              Total Balance: ${totalBalance.toFixed(2)}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Recent Transactions */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Recent Transactions
            </Typography>
            <List>
              {transactions.length > 0 ? (
                transactions.slice(0, 5).map((tx) => (
                  <React.Fragment key={tx.id}>
                    <ListItem>
                      <ListItemText
                        primary={`Type: ${tx.transactionType}`}
                        secondary={`Amount: ${tx.amount.toFixed(2)} - Date: ${new Date(tx.transactionDate).toLocaleDateString()}`}
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))
              ) : (
                <Typography>No recent transactions.</Typography>
              )}
            </List>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default HomePage;
