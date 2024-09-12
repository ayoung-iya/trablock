/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';

interface VerticalResizerProps extends React.PropsWithChildren {
  isResizable?: boolean;
}

const MIN_HEIGHT = 60;

export default function VerticalResizer({ isResizable = true, children }: VerticalResizerProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [panelHeight, setPanelHeight] = useState('400px');

  const handleMouseMove = useCallback((e: MouseEvent) => {
    e.preventDefault();

    const SIDEBAR_HEIGHT = 32;
    const newHeight = window.innerHeight - e.clientY;

    if (newHeight < MIN_HEIGHT) {
      return;
    }

    // TODO: 상수화
    if (newHeight + SIDEBAR_HEIGHT > window.innerHeight - 100) {
      setPanelHeight(`${window.innerHeight - SIDEBAR_HEIGHT - 100}px`);
      return;
    }

    setPanelHeight(() => `${newHeight - SIDEBAR_HEIGHT / 2}px`);
  }, []);

  const handleDrag: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  useEffect(() => {
    if (!isDragging) {
      return;
    }

    document.addEventListener('mousemove', handleMouseMove);

    document.addEventListener('click', () => setIsDragging(false));

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDragging, handleMouseMove]);

  return (
    <>
      {isResizable && (
        <button
          type="button"
          className="flex-row-center fixed z-10 h-8 w-full cursor-ns-resize justify-center rounded-t-[20px] bg-white-01 lg:hidden"
          onMouseDown={handleDrag}
          style={{
            bottom: panelHeight
          }}
        >
          <div className="h-[0.3125rem] w-16 rounded-full bg-gray-02 lg:hidden" />
        </button>
      )}

      <div style={isResizable ? { height: panelHeight } : undefined}>{children}</div>
    </>
  );
}
