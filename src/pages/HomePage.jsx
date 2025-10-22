import React, { useContext, useEffect } from 'react';
import {
  Typography,
  Grid,
  Paper,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import { DataContext } from '../contexts/DataContext';
import { AccountBalanceWallet, AccountCircle, ArrowUpward, ArrowDownward } from '@mui/icons-material';

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

  const renderTransactionIcon = (type) => {
    switch (type) {
      case 'DEPOSIT':
        return <ArrowUpward style={{ color: 'green' }} />;
      case 'WITHDRAWAL':
        return <ArrowDownward style={{ color: 'red' }} />;
      case 'TRANSFER':
        return <ArrowDownward style={{ color: 'blue' }} />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom component="div" sx={{ mb: 4 }}>
        Welcome, {userInfo?.username || 'User'}!
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              height: 200,
              justifyContent: 'center',
              backgroundColor: '#f4f6f8',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <AccountBalanceWallet sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
              <Typography variant="h5" component="div">
                Total Balance
              </Typography>
            </Box>
            <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
              ${totalBalance.toFixed(2)}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              height: 200,
              justifyContent: 'center',
              backgroundColor: '#f4f6f8',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <AccountCircle sx={{ fontSize: 40, mr: 2, color: 'secondary.main' }} />
              <Typography variant="h5" component="div">
                Accounts
              </Typography>
            </Box>
            <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
              {accounts.length}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom component="div">
              Recent Transactions
            </Typography>
            <List>
              {transactions.length > 0 ? (
                transactions.slice(0, 5).map((tx, index) => (
                  <React.Fragment key={tx.id}>
                    <ListItem>
                      <ListItemIcon>{renderTransactionIcon(tx.transactionType)}</ListItemIcon>
                      <ListItemText
                        primary={`${tx.amount.toFixed(2)} - ${tx.transactionType}`}
                        secondary={new Date(tx.transactionDate).toLocaleString()}
                      />
                    </ListItem>
                    {index < transactions.slice(0, 5).length - 1 && <Divider />}
                  </React.Fragment>
                ))
              ) : (
                <Typography sx={{ p: 2 }}>No recent transactions.</Typography>
              )}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;
