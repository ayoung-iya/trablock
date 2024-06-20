import React from 'react';

import { useSlate } from 'slate-react';

import Button from '../ToolButton';
import Icon from '../ToolIcon';
import { BlockFormat } from '../types';
import { toggleBlock, isBlockActive } from '../utils/slateUtilityFunctions';

const BlockButton: React.FC<{ format: BlockFormat }> = function BlockButton({ format }) {
  const editor = useSlate();
  return (
    <Button
      active={isBlockActive(editor, format)}
      format={format}
      onMouseDown={(e) => {
        e.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <Icon icon={format} />
    </Button>
  );
};

export default BlockButton;
