import React, { useEffect, useState } from 'react';

import { useSlate } from 'slate-react';

import Button from './ToolButton';
import Icon from './ToolIcon';
import { ToolbarGroup, ToolbarElement, MarkFormat, BlockFormat } from './types';
import {
  toggleBlock,
  toggleMark,
  isMarkActive,
  addMarkData,
  isBlockActive,
  activeMark
} from './utils/slateUtilityFunctions';
import defaultToolbarGroups from './utils/toolbarGroups';
import useTable from './utils/useTable';

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

const Dropdown: React.FC<{
  format: MarkFormat;
  options: { value: string; text: string }[];
}> = function Dropdown({ format, options }) {
  const editor = useSlate();
  const changeMarkData = (event: React.ChangeEvent<HTMLSelectElement> | string, dropdownFormat: MarkFormat) => {
    const value = typeof event === 'string' ? event : event.target.value;
    addMarkData(editor, { format: dropdownFormat, value });
  };
  return (
    <select
      value={activeMark(editor, format)}
      onChange={(e) => {
        changeMarkData(e, format);
      }}
    >
      {options.map((item) => (
        <option key={item.value} value={item.value}>
          {item.text}
        </option>
      ))}
    </select>
  );
};

const Toolbar: React.FC = function Toolbar() {
  const editor = useSlate();
  const isTable = useTable(editor);
  const [toolbarGroups, setToolbarGroups] = useState<ToolbarGroup[]>(defaultToolbarGroups);

  useEffect(() => {
    let filteredGroups = [...defaultToolbarGroups];
    if (isTable) {
      filteredGroups = toolbarGroups.map((grp) => grp.filter((element) => element.type !== 'block'));
      filteredGroups = filteredGroups.filter((elem) => elem.length);
    }
    setToolbarGroups(filteredGroups);
  }, [isTable, toolbarGroups]);

  return (
    <div>
      {toolbarGroups.map((group) => (
        <span key={group[0]?.id ?? 'default-group'}>
          {group.map((element: ToolbarElement) => {
            switch (element.type) {
              case 'dropdown':
                return (
                  <Dropdown
                    key={element.id}
                    format={element.format as MarkFormat}
                    options={element.options as { value: string; text: string }[]}
                  />
                );
              // case 'popover':
              //   return (
              //     <Popover
              //       key={element.id}
              //       format={element.format as MarkFormat}
              //       options={element.options as { value: string; text: string }[]}
              //     />
              //   );

              case 'block':
                return <BlockButton key={element.id} format={element.format as BlockFormat} />;
              case 'mark':
                return <MarkButton key={element.id} format={element.format as MarkFormat} />;

              default:
                return (
                  <button key={element.id} type="button">
                    Invalid Button
                  </button>
                );
            }
          })}
        </span>
      ))}
    </div>
  );
};

export default Toolbar;
