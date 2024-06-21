// IconComponent.jsx
import React from 'react';

function LoadingComponent() {
  return (
    <div className="flex h-[370px] w-full items-center justify-center ">
      <svg
        fill="#000000"
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="800px"
        height="800px"
        viewBox="0 0 26.349 26.35"
        xmlSpace="preserve"
        className="h-6 w-6 animate-spin"
      >
        <g>
          <g>
            <circle cx="13.792" cy="3.082" r="3.082" />
            <circle cx="13.792" cy="24.501" r="1.849" />
            <circle cx="6.219" cy="6.218" r="2.774" />
            <circle cx="21.365" cy="21.363" r="1.541" />
            <circle cx="3.082" cy="13.792" r="2.465" />
            <circle cx="24.501" cy="13.791" r="1.232" />
            <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            <circle cx="21.364" cy="6.218" r="0.924" />
          </g>
        </g>
      </svg>
    </div>
  );
}

export default LoadingComponent;
