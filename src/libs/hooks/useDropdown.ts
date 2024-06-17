import { useEffect, useRef, useState } from 'react';

interface useDropdownParams {
  onClickInside?: (e?: MouseEvent) => void;
}

const useDropdown = ({ onClickInside }: useDropdownParams) => {
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  const ref = useRef<HTMLUListElement>(null);

  const handleDropdownOpen = (e: MouseEvent) => {
    e.stopPropagation();
    setIsDropdownOpened(true);
  };

  const handleDropdownClose = (e: MouseEvent) => {
    e.stopPropagation();
    setIsDropdownOpened(false);
  };

  const handleDropdownToggle = (e: MouseEvent) => {
    e.stopPropagation();
    setIsDropdownOpened((prev) => {
      return !prev;
    });
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!ref.current) return;

      if (ref.current.contains(e.target as Node) && onClickInside) {
        onClickInside(e);
      }

      handleDropdownClose(e);
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [ref, onClickInside]);

  return { ref, isDropdownOpened, handleDropdownOpen, handleDropdownClose, handleDropdownToggle };
};

export default useDropdown;
