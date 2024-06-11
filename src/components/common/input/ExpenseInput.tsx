import React, { forwardRef, useState } from 'react';

import { addNumberCommas, removeNumberCommas } from '@/libs/utils/moneyFormatter';

import Input from './Input';

interface ExpenseInputProps {
  id: string;
  digit?: number;
  placeholder?: string;
  onlyInteger?: boolean;
  onChangeExpense: (newValue: number) => void;
}

const ExpenseInput = forwardRef(function ExpenseInput(
  { id, digit = 12, placeholder, onlyInteger, onChangeExpense }: ExpenseInputProps,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const [expense, setExpense] = useState('');

  const handleFocus: React.FocusEventHandler<HTMLInputElement> = (e) => {
    if (!expense) {
      return;
    }

    const expenseNonComma = String(removeNumberCommas(e.target.value));
    setExpense(expenseNonComma);
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    if (e.target.value === '') {
      setExpense('');
      return;
    }

    const formattedNumber = addNumberCommas(e.target.value);
    setExpense(formattedNumber);
    onChangeExpense(+e.target.value);
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const nextExpense = e.target.value.replace(/[^\d.]/g, '');

    if (e.target.value.length > digit) {
      setExpense(expense);
      return;
    }

    if (e.target.value.includes('.') && onlyInteger) {
      setExpense(expense);
      return;
    }

    if (e.target.value.split('.').length > 2 || e.target.value === '.') {
      setExpense(expense);
      return;
    }

    setExpense(nextExpense);
  };

  return (
    <Input
      type="text"
      id={id}
      value={expense}
      className="w-full"
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      placeholder={placeholder}
      ref={ref}
    />
  );
});

export default ExpenseInput;
