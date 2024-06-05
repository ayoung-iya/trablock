import React from 'react';

/**
 * 블록 공통 타입입니다.
 * @param name string; 이름
 * @param tag string; 태그
 */
export interface DefaultBlockProps extends React.HTMLAttributes<HTMLButtonElement> {
  name: string;
  tag: string;
}

/**
 * 기본 정보를 포함하는 코어 블록입니다.
 * @param name string; 이름
 * @param tag string; 태그
 * @param route \{ start: string; end: string }; 출발지 및 도착지 객체
 * @param memo string; (optional) 메모
 * @param imageUrl string; (optional) 이미지 주소
 */
export interface CoreBlockProps extends DefaultBlockProps {
  route?: { start: string; end: string };
  memo?: string;
  children?: React.ReactNode;
}

/**
 * 기본 정보를 포함하는 코어 블록입니다.
 * @param name string; 이름
 * @param tag string; 태그
 * @param route \{ start: string; end: string }; 출발지 및 도착지 객체
 * @param memo string; (optional) 메모
 * @param imageUrl string; (optional) 이미지 주소
 */
export default function CoreBlock({ name, tag, route, memo, children, onClick }: CoreBlockProps) {
  return (
    <button
      className="flex-row-center border-black w-full justify-between border border-solid p-4"
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
