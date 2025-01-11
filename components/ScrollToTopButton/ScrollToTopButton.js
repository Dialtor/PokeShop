'use client';

import React, { useState, useEffect } from 'react';
import { Fab, Box } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);


  const handleScroll = () => {
    if (window.scrollY > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };


  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


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
        display: visible ? 'block' : 'none',
      }}
    >
      <Fab sx={{width: 50, height: 50}} color="inherit" size="small" onClick={scrollToTop}>
        <KeyboardArrowUpIcon />
      </Fab>
    </Box>
  );
}
