'use client';

import React, { useMemo } from 'react';

import ReactQuill from 'react-quill';
// import ImageResize from 'quill-image-resize-module-react';
// import { ImageDrop } from 'quill-image-drop-module';
import 'react-quill/dist/quill.snow.css';

const formats: string[] = [
  'size',
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
  'code-block',
  'color'
];

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

function TextEditor({ value, onChange }: TextEditorProps) {
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: '1' }, { header: '2' }],
        [{ size: ['small', false, 'large', 'huge'] }, { color: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        ['image']
      ],
      clipboard: {
        matchVisual: false
      }
    }),
    []
  );

  return (
    <ReactQuill
      style={{ width: '100%', height: '300px' }}
      theme="snow"
      value={value}
      onChange={onChange}
      formats={formats}
      modules={modules}
    />
  );
}

export default TextEditor;
