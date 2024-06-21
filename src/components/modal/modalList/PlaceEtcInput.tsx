/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable no-undef */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-new */

'use client';

import React, { useState } from 'react';

import Button from '@/components/common/button/Button';
import Input from '@/components/common/input/Input';

interface PlaceEtcInputProps {
  className?: string;
  onPlaceInput: (name: string) => void;
}

export default function PlaceEtcInput({ className, onPlaceInput }: PlaceEtcInputProps) {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    if (!name) return;
    onPlaceInput(name);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!name) e.preventDefault();
    handleSubmit();
  };

  return (
    <div className={`flex h-full flex-col justify-between ${className}`} style={{ maxHeight: 'calc(100% - 282px)' }}>
      <form onSubmit={handleFormSubmit}>
        <p className="modal-h2 mb-3">장소 입력</p>
        <Input
          id="place-input"
          className="mb-4 w-full rounded-md border border-solid border-gray-01 px-4 py-3 md:mb-80"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="장소를 입력해주세요."
        />
      </form>
      <Button onClick={handleSubmit} className={`btn-lg w-full flex-shrink-0 ${name ? 'btn-solid' : 'btn-gray'}`}>
        완료하기
      </Button>
    </div>
  );
}
