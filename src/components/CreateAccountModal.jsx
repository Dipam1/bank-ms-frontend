import React, { useState, useContext } from "react";
import {
  Button,
  Modal,
  Box,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { DataContext } from "../contexts/DataContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CreateAccountModal = ({ open, handleClose }) => {
  const [accountType, setAccountType] = useState("SAVINGS");
  const [initialBalance, setInitialBalance] = useState(0);
  const { userInfo, createAccount } = useContext(DataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAccount({
        userId: userInfo.id,
        accountType,
        initialBalance,
      });
      handleClose();
    } catch (error) {
      console.error("Failed to create account", error);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Create New Account
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Account Type</InputLabel>
            <Select
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
            >
              <MenuItem value="SAVINGS">Savings</MenuItem>
              <MenuItem value="CHECKING">Checking</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Initial Balance"
            type="number"
            fullWidth
            margin="normal"
            value={initialBalance}
            onChange={(e) => setInitialBalance(e.target.value)}
          />
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Create
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default CreateAccountModal;
