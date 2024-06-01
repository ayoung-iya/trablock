import React from 'react';

import Image from 'next/image';
import { ControllerRenderProps } from 'react-hook-form';

interface ImageInputProps extends ControllerRenderProps {}

export default function ImageInput({ value: imageURL, onChange }: ImageInputProps) {
  const handleImageChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    const nextImageUrl = URL.createObjectURL(file);

    onChange(nextImageUrl);
  };

  const handleImageRemove = () => {
    onChange('');
  };

  return (
    <div className={`relative block size-48 overflow-hidden ${imageURL || 'bg-slate-400'}`}>
      {imageURL && (
        <button type="button" className="absolute right-0 top-0 z-10" onClick={handleImageRemove}>
          취소
        </button>
      )}
      {imageURL && <Image src={imageURL} alt="preview" width={48 * 4} height={48 * 4} className="image-cover" />}
      <input type="file" accept="image/*" className="absolute inset-0 opacity-0" onChange={handleImageChange} />
    </div>
  );
}
