import React from 'react';

import Button from '@/components/common/button/Button';
import Plus from '@/icons/plus.svg';

interface PlusButtonProps {
  onClick: () => void;
}

export default function PlusButton({ onClick }: PlusButtonProps) {
  return (
    <Button className="btn-plus" onClick={onClick} type="button">
      <Plus fill="white" width="20" height="20" />
    </Button>
  );
}
