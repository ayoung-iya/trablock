import React, { useEffect, useState } from 'react';

import { useSlate } from 'slate-react';

import { ToolbarGroup, ToolbarElement, MarkFormat, BlockFormat, EmbedFormat } from './types';
import BlockButton from './utilButtons/BlockButton';
import Dropdown from './utilButtons/Dropdown';
import Embed from './utilButtons/Embed';
import MarkButton from './utilButtons/MarkButton';
import defaultToolbarGroups from './utils/toolbarGroups';
import useTable from './utils/useTable';

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
    <div className="bg-white my-5 flex flex-wrap items-center justify-center border-b-2 pb-5">
      {toolbarGroups.map((group) => (
        <span key={group[0]?.id ?? 'default-group'} className="mx-2 flex flex-wrap gap-1">
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
              case 'embed':
                return <Embed key={element.id} editor={editor} format={element.format as EmbedFormat} />;

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
