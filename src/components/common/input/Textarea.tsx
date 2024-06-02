import React, { forwardRef } from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label?: string;
}

const Textarea = forwardRef(function Textarea(
  { label, id, ...rest }: TextareaProps,
  ref: React.ForwardedRef<HTMLTextAreaElement>
) {
  return (
    <>
      {label && <label htmlFor={id}>{label}</label>}
      <textarea id={id} className="resize-none outline-none" ref={ref} {...rest} />
    </>
  );
});

export default Textarea;
