import React from 'react';

import useDropdownOutside from '@/libs/hooks/useDropdownOutside';

interface DropdownProps extends React.PropsWithChildren {
  handleCloseDropdown: () => void;
}

export default function DropDown({ handleCloseDropdown, children }: DropdownProps) {
  const dropdownRef = useDropdownOutside({ onClickOutside: handleCloseDropdown });

  return <ul ref={dropdownRef}>{children}</ul>;
}
