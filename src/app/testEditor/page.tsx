'use client';

import React, { useMemo, useState } from 'react';

import ReactQuill from 'react-quill';
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

function TestPage() {
  const [values, setValues] = useState<string>('');
  const [editorOpen, setEditorOpen] = useState<boolean>(true);
  const modules = useMemo(() => {
    return {
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
    };
  }, []);
  return (
    <div>
      <div className="flex w-full place-content-between border-2">
        <button type="button" onClick={() => setEditorOpen(true)}>
          Open Editor
        </button>
        <button type="button" onClick={() => setEditorOpen(false)}>
          Close Editor
        </button>
      </div>
      {editorOpen && (
        <div>
          <ReactQuill
            style={{ width: 'auto', height: '400px' }}
            theme="snow"
            value={values}
            onChange={setValues}
            formats={formats}
            modules={modules}
          />
          <div>{values}</div>
        </div>
      )}
    </div>
  );
}

export default TestPage;
