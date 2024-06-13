import { useEffect, useRef, useState } from 'react';

interface useDropdownParams {
  onClickInside?: () => void;
}

const useDropdown = ({ onClickInside }: useDropdownParams) => {
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  const ref = useRef<HTMLUListElement>(null);

  const handleDropdownOpen = () => {
    setIsDropdownOpened(true);
  };

  const handleDropdownClose = () => {
    setIsDropdownOpened(false);
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpened((prev) => !prev);
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!ref.current) return;

      if (ref.current.contains(e.target as Node) && onClickInside) {
        onClickInside();
      }

      handleDropdownClose();
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [ref, onClickInside]);

  return { ref, isDropdownOpened, handleDropdownOpen, handleDropdownClose, handleDropdownToggle };
};

export default useDropdown;
