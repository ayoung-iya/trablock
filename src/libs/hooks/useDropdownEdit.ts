'use client';

import { useEffect, useRef } from 'react';

import { useDropdownState, useDropdownDispatch } from '@/contexts/DropdownContext';

// 수정된 useDropdown, context api 사용
const useDropdownEdit = (id: string) => {
  const ref = useRef<HTMLUListElement>(null);
  const state = useDropdownState();
  const dispatch = useDropdownDispatch();

  const isDropdownOpened = state[id] || false;

  const handleDropdownOpen = () => {
    dispatch({ type: 'CLOSE_ALL', excludeId: id });
    dispatch({ type: 'TOGGLE', id });
  };

  const handleDropdownClose = () => {
    dispatch({ type: 'TOGGLE', id });
  };

  const handleDropdownToggle = (e: MouseEvent) => {
    e.stopPropagation();
    dispatch({ type: 'CLOSE_ALL', excludeId: id });
    dispatch({ type: 'TOGGLE', id });
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) {
        dispatch({ type: 'CLOSE_ALL', excludeId: '' });
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [ref, dispatch]);

  useEffect(() => {
    console.log('isDropdownOpened', isDropdownOpened);
  }, [isDropdownOpened]);

  return { ref, isDropdownOpened, handleDropdownOpen, handleDropdownClose, handleDropdownToggle };
};

export default useDropdownEdit;
