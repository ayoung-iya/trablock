import React from 'react';

interface CoreBlockProps extends React.HTMLAttributes<HTMLButtonElement> {
  name: string;
  tag: string;
  route?: { start: string; end: string };
  memo?: string;
  children?: React.ReactNode;
}

export default function CoreBlock({ name, tag, route, memo, children, onClick }: CoreBlockProps) {
  return (
    <button
      className="flex w-full items-center justify-between border border-solid border-black p-4"
      type="button"
      onClick={onClick}
    >
      <div className="flex flex-col gap-2">
        <p>{name}</p>
        <div className="flex gap-2">
          {/* 태그 컴포넌트 여기에 추가 */}
          <div>{tag}</div>
          {route && (
            <div>
              {route.start} - {route.end}
            </div>
          )}
        </div>
        {memo && <p>{memo}</p>}
      </div>
      {children}
    </button>
  );
}
