/* eslint-disable max-len */
import React from 'react';

interface CircleImageProps {
  imageUrl: string;
  text: string;
  onClick: () => void;
}

export default function CircleImage({ imageUrl, text, onClick }: CircleImageProps) {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div className="flex items-center justify-center" onClick={onClick}>
      <div className="relative flex h-[160px] w-[160px] items-center justify-center overflow-hidden rounded-full bg-gray-200">
        <img
          src={imageUrl}
          alt="profile"
          className="Class
Properties
h-full w-full object-cover brightness-50 drop-shadow-sm"
        />
        <div className="bg-black absolute inset-0 bg-opacity-50" /> {/* Added shade */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-slate-50">{text}</span>
        </div>
      </div>
    </div>
  );
}
