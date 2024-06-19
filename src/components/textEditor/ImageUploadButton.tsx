import React, { ChangeEvent, useState } from 'react';

import uploadImage from './utils/uploadImage';

const ImageUploadButton: React.FC = function ImageUploadButton() {
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (image) {
      setLoading(true);
      try {
        const url = await uploadImage(image);
        if (url) {
          console.log(url);
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      } finally {
        setLoading(false);
      }
    } else {
      console.log('No image selected');
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleChange} />
      <button type="button" onClick={handleUpload} disabled={loading}>
        Upload
      </button>
      {loading && <p>Uploading...</p>}
    </div>
  );
};

export default ImageUploadButton;
