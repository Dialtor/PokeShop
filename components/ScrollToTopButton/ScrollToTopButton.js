'use client';

import React, { useState, useEffect } from 'react';
import { Fab, Box } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  // Mostrar el botón si se hace scroll hacia abajo
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  // Listener para el scroll
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Función para hacer scroll hacia arriba
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        zIndex: 1000,
        display: visible ? 'block' : 'none', // Ocultar cuando no es visible
      }}
    >
      <Fab sx={{width: 50, height: 50}} color="inherit" size="small" onClick={scrollToTop}>
        <KeyboardArrowUpIcon />
      </Fab>
    </Box>
  );
}
