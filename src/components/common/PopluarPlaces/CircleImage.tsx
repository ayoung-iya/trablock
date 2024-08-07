/* eslint-disable max-len */

import Image, { StaticImageData } from 'next/image';

interface CircleImageProps {
  className?: string;
  imageUrl: StaticImageData;
  text: string;
  onClick: () => void;
}

export default function CircleImage({ className, imageUrl, text, onClick }: CircleImageProps) {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div className={`flex items-center justify-center ${className}`} onClick={onClick}>
      <div className="relative flex size-[120px] cursor-pointer items-center justify-center rounded-full bg-gray-300  md:size-[140px]">
        <Image src={imageUrl} alt="profile" className=" size-[120px] rounded-full brightness-50 md:size-[140px]" />
        <div className="bg-black absolute inset-0 bg-opacity-50" /> {/* Added shade */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-slate-50">{text}</span>
        </div>
      </div>
    </div>
  );
}
