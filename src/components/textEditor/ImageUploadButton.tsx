'use client';

import React, { ChangeEvent, useState } from 'react';

import uploadImage from './utils/uploadImage';

interface ImageUploadButtonProps {
  onUploadSuccess: (url: string) => void;
}

const ImageUploadButton: React.FC<ImageUploadButtonProps> = function ImageUploadButton({ onUploadSuccess }) {
  const [loading, setLoading] = useState(false);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLoading(true);
      try {
        const url = await uploadImage(file);
        if (url) {
          console.log(url);
          onUploadSuccess(url);
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col">
      <input type="file" accept="image/*" onChange={handleChange} />
      {/* <button className="bg-blue-200 text-center" type="button" onClick={handleUpload} disabled={loading}>
        Upload
      </button> */}
      {loading && <div className="text-red-200">Uploading...</div>}
    </div>
  );
};

export default ImageUploadButton;
