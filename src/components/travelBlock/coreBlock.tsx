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
    <div>
      <p>{name}</p>
      {/* 태그 컴포넌트 여기에 추가 */}
      <div>{tag}</div>
      {route && (
        <p>
          {route.start} - {route.end}
        </p>
      )}
      {memo && <p>{memo}</p>}
      {children}
    </div>
  );
}
