import React from 'react';

import { useSlate } from 'slate-react';

import Button from '../ToolButton';
import Icon from '../ToolIcon';
import { MarkFormat } from '../types';
import { toggleMark, isMarkActive } from '../utils/slateUtilityFunctions';

const MarkButton: React.FC<{ format: MarkFormat }> = function MarkButton({ format }) {
  const editor = useSlate();
  return (
    <Button
      active={isMarkActive(editor, format)}
      format={format}
      onMouseDown={(e) => {
        e.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <Icon icon={format} />
    </Button>
  );
};

export default MarkButton;
