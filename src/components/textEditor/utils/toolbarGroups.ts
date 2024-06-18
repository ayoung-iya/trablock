// toolbarGroups.ts
import { ToolbarGroup } from '../types';

const toolbarGroups: ToolbarGroup[] = [
  [
    {
      id: 1,
      format: 'fontSize',
      type: 'dropdown',
      options: [
        { text: '본문', value: '16px' }, // Body text
        { text: '제목 1', value: '32px' }, // Heading 1
        { text: '제목 2', value: '24px' }, // Heading 2
        { text: '제목 3', value: '18.72px' } // Heading 3
      ]
    }
  ],
  [
    {
      id: 2,
      format: 'color',
      type: 'dropdown',
      options: [
        { text: '검정⚫', value: 'black' },
        { text: '빨강🔴', value: 'red' },
        { text: '파랑🔵', value: 'blue' },
        { text: '회색⚪', value: 'gray' }
      ]
    },
    {
      id: 3,
      format: 'color',
      type: 'popover',
      options: [
        { text: '검정', value: 'black' },
        { text: '빨강', value: 'red' },
        { text: '파랑', value: 'blue' },
        { text: '회색', value: 'gray' }
      ]
    }
  ],
  [
    {
      id: 4,
      format: 'bold',
      type: 'mark'
    },
    {
      id: 5,
      format: 'italic',
      type: 'mark'
    },
    {
      id: 6,
      format: 'underline',
      type: 'mark'
    }
  ],

  [
    {
      id: 7,
      format: 'alignLeft',
      type: 'block'
    },
    {
      id: 8,
      format: 'alignCenter',
      type: 'block'
    },
    {
      id: 9,
      format: 'alignRight',
      type: 'block'
    }
  ],
  [
    {
      id: 10,
      format: 'image',
      type: 'embed'
    }
  ]
];

export default toolbarGroups;
