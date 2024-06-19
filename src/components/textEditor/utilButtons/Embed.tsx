import React, { useRef, useState, useCallback } from 'react';

import { BaseSelection, Transforms, Editor } from 'slate';

import ImageUploadButton from '../ImageUploadButton';
import Button from '../ToolButton';
import Icon from '../ToolIcon';
import { insertEmbed } from '../utils/embed';
import { isBlockActive } from '../utils/slateUtilityFunctions';
import usePopup from '../utils/usePopup';
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
  const urlInputRef = useRef<HTMLInputElement>(null);
  // const submitButtonRef = useRef<HTMLButtonElement>(null);
  const [showInput, setShowInput] = usePopup(urlInputRef);
  const [formData, setFormData] = useState<FormData>({ url: '', width: '', height: '' });
  const [selection, setSelection] = useState<BaseSelection | null>(null);
  const isTable = useTable(editor);

  const handleButtonClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setSelection(editor.selection);
      setShowInput((prev) => !prev);
    },
    [editor.selection]
  );

  // const handleFormSubmit = useCallback(
  //   (e?: FormEvent<HTMLFormElement>) => {
  //     if (e) {
  //       e.preventDefault();
  //     }
  //     if (!isTable && selection) {
  //       Transforms.select(editor, selection);
  //     }
  //     insertEmbed(editor, { ...formData }, format);
  //     setShowInput(false);
  //     setFormData({
  //       url: '',
  //       width: '',
  //       height: ''
  //     });
  //   },
  //   [editor, formData, format, isTable, selection]
  // );

  const handleEmbedSubmit = useCallback(() => {
    console.log('handleEmbedSubmit');
    if (!isTable && selection) {
      Transforms.select(editor, selection);
    }
    insertEmbed(editor, { ...formData }, format);
    setShowInput(false);
    setFormData({
      url: '',
      width: '',
      height: ''
    });
  }, [editor, formData, format, isTable, selection]);

  const handleImageUploadSuccess = (url: string) => {
    console.log('url', url);
    setFormData((prev) => ({ ...prev, url }));
  };

  return (
    <div ref={urlInputRef} className="relative">
      <Button
        active={isBlockActive(editor, format)}
        className={`${showInput ? 'rounded-md bg-gray-200 p-2' : ''} border-b-none`}
        format={format}
        onClick={handleButtonClick}
      >
        <Icon icon={format} />
      </Button>
      {showInput && (
        <div className="absolute top-[50px] rounded-xl border-2 bg-white-01">
          {format === 'image' && (
            <div>
              <div
                style={{ display: 'flex', gap: '10px' }}
                onClick={() => {}}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleImageUploadSuccess(formData.url);
                  }
                }}
                role="button"
                tabIndex={0}
              >
                <Icon icon="upload" />
                <span>Upload</span>
              </div>
              <p style={{ textAlign: 'center', opacity: '0.7', width: '100%' }}>OR</p>
            </div>
          )}
          <div>{formData.url}</div>
          <button type="button" onClick={handleEmbedSubmit}>
            SUBMIT
          </button>
          <ImageUploadButton onUploadSuccess={handleImageUploadSuccess} />
        </div>
      )}
    </div>
  );
}

export default Embed;
