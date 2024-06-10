/* eslint-disable max-len */

'use client';

import React from 'react';

import ArrowButton from '@/components/common/button/Arrow';

export default function Home() {
  const handleClick = () => {
    console.log('Arrow button clicked');
  };

  return (
    <div>
      <ArrowButton direction="left" onClick={handleClick} />
      <ArrowButton direction="left" onClick={handleClick} disabled />
      <ArrowButton direction="right" onClick={handleClick} />
      <ArrowButton direction="right" onClick={handleClick} disabled />
    </div>
  );
}
