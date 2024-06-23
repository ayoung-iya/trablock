import React from 'react';
// import { useSelected, useFocused } from 'slate-react';

interface ImageProps {
  attributes: any;
  element: {
    url: string;
    width: string;
    height: string;
    alt?: string;
    attr?: React.HTMLAttributes<HTMLDivElement>;
  };
  children: React.ReactNode;
}

function Image({ attributes, element, children }: ImageProps) {
  const { url, width, height, alt } = element;

  return (
    <div {...attributes} {...element.attr}>
      <div contentEditable={false} style={{ width, height }}>
        <img alt={alt} src={url} />
      </div>
      {children}
    </div>
  );
}

export default Image;
