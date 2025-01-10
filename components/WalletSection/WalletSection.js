'use client';

import React, { useState } from 'react';
import { Button, Typography, TextField } from '@mui/material';
import { useWalletStore } from '@/stores/useWalletStore';

export default function WalletSection() {
  const { balance, addFunds, clearBalance } = useWalletStore();

  const [customAmount, setCustomAmount] = useState('');


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
    <div style={{ padding: '1rem', border: '1px solid #ccc' }}>
      <Typography variant="h6" gutterBottom>
        Saldo del monedero: $ {balance.toFixed(2)}
      </Typography>

      <Button variant="contained" onClick={handleAddFunds} sx={{ mr: 1 }}>
        +100 MXN
      </Button>

      <Button variant="contained" color="error" onClick={handleClearBalance}>
        Limpiar Balance
      </Button>

      <div style={{ marginTop: '1rem' }}>
        <TextField
          label="Monto personalizado"
          variant="outlined"
          size="small"
          value={customAmount}
          onChange={(e) => setCustomAmount(e.target.value)}
          type="number"
          inputProps={{ min: '0', step: '0.01' }}
          sx={{ mr: 1 }}
        />
        <Button variant="contained" onClick={handleAddCustomFunds}>
          Agregar Monto
        </Button>
      </div>
    </div>
  );
}
