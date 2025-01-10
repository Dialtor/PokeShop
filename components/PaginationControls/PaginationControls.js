'use client';

import { Box, Button } from '@mui/material';

export default function PaginationControls({ offset, isPreviousData, onPrev, onNext }) {
  return (
    <Box mt={2} display="flex" gap={2}>
      <Button
        variant="contained"
        color="primary"
        onClick={onPrev}
        disabled={offset === 0 || isPreviousData}
      >
        Anterior
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={onNext}
        disabled={isPreviousData}
      >
        Siguiente
      </Button>
    </Box>
  );
}
