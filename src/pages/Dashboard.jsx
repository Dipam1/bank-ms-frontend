import React, { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  Box,
} from "@mui/material";
import {
  Home as HomeIcon,
  AccountBalance as AccountBalanceIcon,
  SwapHoriz as SwapHorizIcon,
  CreditCard as CreditCardIcon,
  CardGiftcard as CardGiftcardIcon,
  Lock as LockIcon,
  MonetizationOn as MonetizationOnIcon,
} from "@mui/icons-material";
import { AuthContext } from "../contexts/AuthContext";

const drawerWidth = 240;

const Dashboard = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    { text: "Home", icon: <HomeIcon />, path: "/" },
    { text: "Accounts", icon: <AccountBalanceIcon />, path: "/accounts" },
    { text: "Transfer", icon: <SwapHorizIcon />, path: "/transfer" },
    { text: "Loans", icon: <MonetizationOnIcon />, path: "/loans" },
    { text: "Credit Cards", icon: <CreditCardIcon />, path: "/credit-cards" },
    { text: "Lockers", icon: <LockIcon />, path: "/lockers" },
    { text: "Gift Cards", icon: <CardGiftcardIcon />, path: "/gift-cards" },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Bank Dashboard
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {menuItems.map((item) => (
              <ListItem
                style={{ cursor: "pointer" }}
                button
                key={item.text}
                onClick={() => navigate(item.path)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Dashboard;
