'use client';

import { useState } from 'react';

export function usePagination(initialLimit = 50) {
  const [limit] = useState(initialLimit);
  const [offset, setOffset] = useState(0);

  const handleNext = () => {
    setOffset((prevOffset) => prevOffset + limit);
  };

  const handlePrev = () => {
    setOffset((prevOffset) => {
      const nextOffset = prevOffset - limit;
      return nextOffset < 0 ? 0 : nextOffset;
    });
  };

  return {
    limit,
    offset,
    handleNext,
    handlePrev,
  };
}
