import React, { useState, useEffect, useContext } from "react";
import {
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import CreateAccountModal from "../components/CreateAccountModal";
import { DataContext } from "../contexts/DataContext";
import "./accounts.css";

const AccountsPage = () => {
  const { userInfo, accounts, fetchAccounts, deleteAccount } = useContext(DataContext);
  const [openCreateModal, setOpenCreateModal] = useState(false);

  useEffect(() => {
    if (userInfo) {
      fetchAccounts();
    }
  }, [userInfo]);

  const handleDelete = (accountId) => {
    if (window.confirm("Are you sure you want to delete this account?")) {
      deleteAccount(accountId);
    }
  };

  return (
    <Container>
      <div className="header">
        <Typography variant="h4" component="h4" gutterBottom>
          Your Accounts
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenCreateModal(true)}
        >
          Add Account
        </Button>
      </div>

      {accounts.length === 0 ? (
        <Typography>No accounts found.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Account ID</TableCell>
                <TableCell>Account Number</TableCell>
                <TableCell>Account Type</TableCell>
                <TableCell>Balance</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {accounts.map((account) => (
                <TableRow key={account.id}>
                  <TableCell>{account.id}</TableCell>
                  <TableCell>{account.accountNumber}</TableCell>
                  <TableCell>{account.accountType}</TableCell>
                  <TableCell>${account.balance.toFixed(2)}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDelete(account.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <CreateAccountModal
        open={openCreateModal}
        handleClose={() => setOpenCreateModal(false)}
      />
    </Container>
  );
};

export default AccountsPage;
