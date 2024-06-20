'use client';

import React, { useRef, useState } from 'react';

import { Descendant } from 'slate';

import DayButton from '@/components/textEditor/DayButton';
import SlateEditor, { SlateEditorRef } from '@/components/textEditor/SlateEditor';

function Page() {
  const days = 5;
  const [activeDay, setActiveDay] = useState<number>(1); // Default to the first day being active
  const [editorValues, setEditorValues] = useState<Descendant[][]>(
    Array(days).fill([{ type: 'paragraph', children: [{ text: '' }] }])
  );
  const editorRefs = useRef<(SlateEditorRef | null)[]>(Array(days).fill(null));
  const [serializedValues, setSerializedValues] = useState<string[]>(Array(days).fill(''));

  const handleDayButtonClick = (day: number) => {
    setActiveDay(day);
  };

  const handleEditorChange = (index: number, value: Descendant[]) => {
    const newValues = [...editorValues];
    newValues[index] = value;
    setEditorValues(newValues);
  };

  const handleButtonClick = () => {
    const allSerializedValues = editorRefs.current.map((ref, index) => {
      const serializedValue = ref?.getSerializedValue() || '';
      setSerializedValues((prev) => {
        const newValues = [...prev];
        newValues[index] = serializedValue;
        return newValues;
      });
      return serializedValue;
    });
    console.log('Serialized Values:', allSerializedValues);
  };

  return (
    <div className="relative flex flex-col gap-10">
      <div className=" flex flex-row place-content-evenly">
        <div>GNB</div>
        <div>
          <button
            type="button"
            onClick={handleButtonClick}
            className="rounded bg-blue-500 p-2 text-slate-50 hover:bg-blue-700"
          >
            발행하기
          </button>
        </div>
      </div>

      <div className="border-b-500 absolute top-[200px] w-full px-40">
        <div className="flex flex-col gap-[20px]">
          <input
            className="w-full text-[32px] focus:border-b-gray-500 focus:outline-none"
            placeholder="제목을 입력하세요"
            type="text"
          />
          <div className="border-b-2" />
          <div className="flex gap-[10px]">
            {[...Array(days)].map((_, index) => (
              <DayButton activeDay={activeDay} day={index + 1} handleDayButtonClick={handleDayButtonClick} />
            ))}
          </div>
          <div className="w-full rounded-xl bg-gray-400 px-[32px] py-[24px] text-[16px]">
            후쿠오카공항 / 스시사카바 / 프린스 스마트 인 하카타 / 무이치몬 하카타점
          </div>
        </div>
      </div>
      <div>
        {[...Array(days)].map((_, index) => (
          <div className={activeDay === index + 1 ? 'block' : 'hidden'}>
            <SlateEditor
              ref={(el) => {
                editorRefs.current[index] = el;
              }}
              value={editorValues[index]}
              onChange={(value) => handleEditorChange(index, value)}
            />
          </div>
        ))}
      </div>

      <div>
        <h2>All Serialized Values:</h2>
        {serializedValues.map((serializedValue, index) => (
          <div>
            <h3>Day {index + 1}</h3>
            <div>{serializedValue}</div>
            <div dangerouslySetInnerHTML={{ __html: serializedValue }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Page;
