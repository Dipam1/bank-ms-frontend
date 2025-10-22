import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import HomePage from './pages/HomePage';
import AccountsPage from './pages/AccountsPage';
import TransferPage from './pages/TransferPage';
import LoansPage from './pages/LoansPage';
import CreditCardsPage from './pages/CreditCardsPage';
import LockersPage from './pages/LockersPage';
import GiftCardsPage from './pages/GiftCardsPage';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<Dashboard />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/accounts" element={<AccountsPage />} />
            <Route path="/transfer" element={<TransferPage />} />
            <Route path="/loans" element={<LoansPage />} />
            <Route path="/credit-cards" element={<CreditCardsPage />} />
            <Route path="/lockers" element={<LockersPage />} />
            <Route path="/gift-cards" element={<GiftCardsPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
