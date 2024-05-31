import { useEffect, useRef } from 'react';

interface DropdownOutsideParams {
  onClickInside: () => void;
  onClickOutside: () => void;
}

/**
 * onClickInside: dropdown의 요소를 클릭했을 때의 동작 함수
 * onClickOutside: dropdown의 요소 바깥을 클릭했을 때의 동작 함수
 * ref를 통해 dropdown의 요소를 지정
 */
const useDropdownOutside = ({ onClickInside, onClickOutside }: DropdownOutsideParams) => {
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!ref.current) return;

      if (!ref.current.contains(e.target as Node)) {
        onClickOutside();
        return;
      }
      onClickInside();
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [ref, onClickInside, onClickOutside]);

  return ref;
};

export default useDropdownOutside;
