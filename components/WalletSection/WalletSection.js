'use client';

import React, { useState } from 'react';
import {
  Button,
  Typography,
  TextField,
  Popover,
  Box,
  IconButton,
} from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useWalletStore } from '@/stores/useWalletStore';

export default function WalletSection() {
  const { balance, addFunds, clearBalance } = useWalletStore();

  const [anchorEl, setAnchorEl] = useState(null);
  const [customAmount, setCustomAmount] = useState('');

  // Abrir/cerrar el Popover
  const handleOpenPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  // Lógica para agregar fondos personalizados
  const handleAddFunds = () => {
    addFunds(100);
  };

  const handleAddCustomFunds = () => {
    const parsedAmount = parseFloat(customAmount);
    if (!isNaN(parsedAmount) && parsedAmount > 0) {
      addFunds(parsedAmount);
      setCustomAmount('');
    } else {
      alert('Ingresa un monto válido mayor que 0');
    }
  };

  const handleClearBalance = () => {
    clearBalance();
  };

  return (
    <Box>
      {/* Botón para abrir el Popover */}
      <IconButton color="inherit" onClick={handleOpenPopover}>
        <AccountBalanceWalletIcon />
      </IconButton>

      {/* Popover */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box sx={{ padding: '1rem', width: 300 }}>
          <Typography variant="h6" gutterBottom>
            Saldo del monedero: $ {balance.toFixed(2)}
          </Typography>

          <Button
            variant="contained"
            onClick={handleAddFunds}
            sx={{ mr: 1, mb: 1 }}
          >
            +100 MXN
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={handleClearBalance}
            sx={{ mb: 1 }}
          >
            Limpiar Balance
          </Button>

          <div>
            <TextField
              label="Monto personalizado"
              variant="outlined"
              size="small"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              type="number"
              inputProps={{ min: '0', step: '0.01' }}
              sx={{ mr: 1, width: '70%' }}
            />
            <Button variant="contained" onClick={handleAddCustomFunds}>
              Agregar
            </Button>
          </div>
        </Box>
      </Popover>
    </Box>
  );
}
