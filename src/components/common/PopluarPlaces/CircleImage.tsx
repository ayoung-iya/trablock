/* eslint-disable max-len */

import Image, { StaticImageData } from 'next/image';

interface CircleImageProps {
  className?: string;
  imageUrl: StaticImageData;
  text: string;
}

export default function CircleImage({ className, imageUrl, text }: CircleImageProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="relative flex size-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-full bg-gray-300 md:size-[140px]">
        <Image src={imageUrl} alt="profile" className="brightness-50" width={140} height={140} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-slate-50">{text}</span>
        </div>
      </div>
    </div>
  );
}
