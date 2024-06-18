import React, { DetailedHTMLProps, HTMLAttributes, FC } from 'react';

interface ToolButtonProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  format: string;
  active: boolean;
  color?: string;
}

const ToolButton: FC<ToolButtonProps> = function ToolButton(props) {
  const { children, format, active, ...rest } = props;
  return (
    <div
      className={`${active ? 'bg-gray-200 text-gray-700' : 'text-gray-500 hover:bg-gray-200 hover:text-gray-700'} 
      cursor-pointer rounded-md p-2`}
      {...rest}
      title={format}
    >
      {children}
    </div>
  );
};

export default ToolButton;
