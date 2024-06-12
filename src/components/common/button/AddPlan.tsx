import React from 'react';

import Button from '@/components/common/button/Button';
import Plus from '@/icons/plus.svg';

/**
 * AddPlanButton 버튼 컴포넌트.
 * 클래스 네임을 통해 사이즈를 지정할 수 있습니다.
 *
 * @param {function} onClick
 * @param {string} [className='add-md']
 *
 * @example
 * <AddPlanButton onClick={handleClick} />
 * <AddPlanButton onClick={handleClick} className="add-sm" />
 */

interface AddPlanButtonProps {
  onClick: () => void;
  className?: string;
}

export default function AddPlanButton({ onClick, className = 'add-md' }: AddPlanButtonProps) {
  const buttonClassName = `btn-add ${className}`;
  return (
    <Button className={buttonClassName} onClick={onClick} type="button">
      <Plus fill="#4F80FF" width="20" height="20" />
    </Button>
  );
}
