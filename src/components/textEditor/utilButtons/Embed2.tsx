import React, { useRef, useState, ChangeEvent, useCallback } from 'react';

import { BaseSelection, Transforms, Editor } from 'slate';

import Icon from '../ToolIcon';
import { insertEmbed } from '../utils/embed';
import uploadImage from '../utils/uploadImage';
import useTable from '../utils/useTable';

interface EmbedProps {
  editor: Editor;
  format: 'image' | 'video';
}

interface FormData {
  url: string;
  width: string;
  height: string;
}

function Embed({ editor, format }: EmbedProps) {
  const [formData, setFormData] = useState<FormData>({ url: '', width: '', height: '' });
  const [selection, setSelection] = useState<BaseSelection | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isTable = useTable(editor);
  const [loading, setLoading] = useState(false);

  const handleEmbedSubmit = useCallback(
    (updatedFormData?: FormData) => {
      const dataToSubmit = updatedFormData || formData; // Use updated formData if provided
      console.log('handleEmbedSubmit');
      if (!isTable && selection) {
        Transforms.select(editor, selection);
      }
      insertEmbed(editor, { ...dataToSubmit }, format);

      setFormData({
        url: '',
        width: '',
        height: ''
      });
    },
    [editor, formData, format, isTable, selection]
  );

  const handleButtonClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setSelection(editor.selection);
    },
    [editor.selection]
  );

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLoading(true);
      try {
        console.log('Uploading image...');
        const url = await uploadImage(file);
        if (url) {
          console.log(url);
          setFormData((prev) => ({ ...prev, url }));
          handleEmbedSubmit({ ...formData, url }); // Call handleEmbedSubmit with updated formData
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col">
      {!loading && (
        <div
          onClick={handleIconClick}
          onKeyPress={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleIconClick();
            }
          }}
          role="button"
          tabIndex={0}
        >
          <button type="button" onClick={handleButtonClick} style={{ display: 'none' }}>
            1
          </button>
          <Icon icon={format} />
          <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleChange} />
        </div>
      )}

      {loading && <div className="text-red-200">Uploading...</div>}
    </div>
  );
}

export default Embed;
