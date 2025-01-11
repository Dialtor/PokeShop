'use client';

import React, { useState } from 'react';
import {
  Button,
  Typography,
  TextField,
  Popover,
  Box,
  IconButton,
  Divider,
  keyframes,
} from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useWalletStore } from '@/stores/useWalletStore';

export default function WalletSection() {
  const { balance, addFunds, clearBalance } = useWalletStore();

  const [anchorEl, setAnchorEl] = useState(null);
  const [customAmount, setCustomAmount] = useState('');

  const handleOpenPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleAddFunds = () => {
    addFunds(500);
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

  // Animación para el ícono del monedero
  const pulseAnimation = keyframes`
    0% { transform: scale(1); }
    50% { transform: scale(1.2); color:rgb(241, 217, 223) }
    100% { transform: scale(1); }
  `;

  return (
    <Box>
      {/* Botón para abrir el Popover */}
      <IconButton
        color="inherit"
        onClick={handleOpenPopover}
        sx={{
          animation: balance === 0 ? `${pulseAnimation} 1.3s infinite` : 'none',
          animationTimingFunction: 'ease-in-out',
        }}
      >
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
        <Box
          sx={{
            padding: 2,
            width: 320,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Saldo del monedero
          </Typography>
          <Typography
            variant="h4"
            color="textPrimary"
            sx={{ fontWeight: 'bold' }}
          >
            $ {balance.toFixed(2)} MXN
          </Typography>

          <Divider sx={{ my: 1 }} />

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="contained"
              color="inherit"
              startIcon={<AddCircleOutlineIcon />}
              onClick={handleAddFunds}
              fullWidth
            >
              +500 MXN
            </Button>
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteOutlineIcon />}
              onClick={handleClearBalance}
              fullWidth
              sx={{ fontSize: 11 }}
            >
              Eliminar Saldo
            </Button>
          </Box>

          <Divider sx={{ my: 1 }} />

          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              label="Monto personalizado"
              variant="outlined"
              size="small"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              type="number"
              inputProps={{ min: '0', step: '0.01' }}
              fullWidth
            />
            <Button
              variant="contained"
              color="success"
              onClick={handleAddCustomFunds}
              sx={{ whiteSpace: 'nowrap' }}
            >
              Agregar
            </Button>
          </Box>
        </Box>
      </Popover>
    </Box>
  );
}
