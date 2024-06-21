import React, { useState, useEffect, MutableRefObject } from 'react';

function usePopup(
  popupRef: MutableRefObject<HTMLDivElement | null>
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const clickedComponent = e.target as Node;
      if (popupRef.current && !popupRef.current.contains(clickedComponent)) {
        setShowPopup(false);
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  return [showPopup, setShowPopup];
}

export default usePopup;
