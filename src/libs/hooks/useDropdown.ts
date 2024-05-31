import { useState } from 'react';

// dropdown의 열린 상태, 상태 변경을 관리하는 hook
const useDropdown = () => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  const handleOpenDropdown = () => {
    setIsOpenDropdown(true);
  };

  const handleCloseDropdown = () => {
    setIsOpenDropdown(false);
  };

  const handleToggleDropdown = () => {
    setIsOpenDropdown((prev) => !prev);
  };

  return { isOpenDropdown, handleOpenDropdown, handleCloseDropdown, handleToggleDropdown };
};

export default useDropdown;
