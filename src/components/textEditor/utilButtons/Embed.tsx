import React, { useRef, useState, useCallback, FormEvent } from 'react';

import { BaseSelection, Transforms, Editor } from 'slate';

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

  const handleFormSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      console.log('handleFormSubmit');
      e.preventDefault();
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
    },
    [editor, formData, format, isTable, selection]
  );

  const handleImageUpload = useCallback(() => {
    setShowInput(false);
  }, []);

  return (
    <div ref={urlInputRef} className="relative">
      <Button
        active={isBlockActive(editor, format)}
        style={{ border: showInput ? '1px solid lightgray' : '', borderBottom: 'none' }}
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
                onClick={handleImageUpload}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleImageUpload();
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
          <form onSubmit={handleFormSubmit}>
            <div className="flex flex-col gap-1 p-5">
              <div>
                <input
                  type="text"
                  placeholder="Enter url"
                  value={formData.url}
                  onChange={(e) => setFormData((prev) => ({ ...prev, url: e.target.value }))}
                />
                <input
                  type="text"
                  placeholder="Enter width of frame"
                  value={formData.width}
                  onChange={(e) => setFormData((prev) => ({ ...prev, width: e.target.value }))}
                />
                <input
                  type="text"
                  placeholder="Enter height of frame"
                  value={formData.height}
                  onChange={(e) => setFormData((prev) => ({ ...prev, height: e.target.value }))}
                />
              </div>

              <Button format="submit" active={false} type="submit">
                Save
              </Button>
              <button type="submit">submit</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Embed;
