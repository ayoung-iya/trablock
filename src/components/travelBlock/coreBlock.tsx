import React from 'react';

interface CoreBlockProps {
  name: string;
  tag: string;
  route?: { start: string; end: string };
  memo?: string;
  children?: React.ReactNode;
}

export default function CoreBlock({ name, tag, route, memo, children }: CoreBlockProps) {
  return (
    <div className="flex flex-row items-center justify-between border border-solid border-black">
      <div>
        <div>{name}</div>
        {/* 태그 컴포넌트 여기에 추가 */}
        <div className="flex flex-row">
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
    </div>
  );
}
