/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';

import Image from 'next/image';

import partition from '@/icons/partition.svg?url';

interface HorizontalResizerProps extends React.PropsWithChildren {
  isResizable?: boolean;
}

const MIN_WIDTH = 300;

export default function HorizontalResizer({ isResizable = true, children }: HorizontalResizerProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [panelWidth, setPanelWidth] = useState('50%');

  const handleMouseMove = useCallback((e: MouseEvent) => {
    e.preventDefault();

    const SIDEBAR_WIDTH = 20;
    if (e.clientX < MIN_WIDTH) {
      return;
    }

    if (e.clientX > window.innerWidth - 100) {
      setPanelWidth(`${window.innerWidth - 100}px`);
      return;
    }

    setPanelWidth(() => `${e.clientX - SIDEBAR_WIDTH / 2}px`);
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
          className="flex-row-center relative left-2/4 z-10 hidden h-full w-5 cursor-ew-resize justify-center rounded-none bg-white-01 lg:absolute"
          onMouseDown={handleDrag}
          style={{
            left: panelWidth
          }}
        >
          <Image src={partition} alt="드래그" width={20} height={20} className="hidden lg:block" />
        </button>
      )}

      <div style={isResizable ? { width: panelWidth } : undefined}>{children}</div>
    </>
  );
}
