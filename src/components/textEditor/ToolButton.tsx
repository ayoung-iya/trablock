import React, { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

interface ToolButtonProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  format: string;
  active: boolean;
  color?: string;
  type?: 'button' | 'submit' | 'reset'; // Adding type as an optional prop
  children: ReactNode; // Explicitly declare children prop
}

function ToolButton({ children, format, active, type, ...rest }: ToolButtonProps) {
  return (
    <div
      className={`text-center ${active ? 'bg-gray-200 text-gray-700' : 'text-gray-500 hover:text-gray-700'} 
      cursor-pointer rounded-md p-2`}
      {...rest}
      title={format}
      role={type === 'button' || type === 'submit' || type === 'reset' ? type : undefined}
    >
      {children}
    </div>
  );
}

export default ToolButton;
