import React from 'react';

import { BaseEditor, Descendant } from 'slate';
import { HistoryEditor } from 'slate-history';
import { ReactEditor } from 'slate-react';

export type MarkFormat =
  | 'bold'
  | 'italic'
  | 'underline'
  | 'strikethrough'
  | 'superscript'
  | 'subscript'
  | 'color'
  | 'bgColor'
  | 'fontSize'
  | 'fontFamily';

export type BlockFormat = 'alignLeft' | 'alignCenter' | 'alignRight' | 'orderedList' | 'unorderedList';

export type EmbedFormat = 'image' | 'video';

export type ToolbarFormat = MarkFormat | BlockFormat | EmbedFormat;

export type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  superscript?: boolean;
  subscript?: boolean;
  color?: string;
  bgColor?: string;
  fontSize?: string;
  fontFamily?: string;
};

export interface CustomElement {
  type: string;
  children: Descendant[];
}

export interface ImageElement extends CustomElement {
  type: 'image';
  url: string;
  width: string;
  height: string;
  alt?: string;
  attr?: React.HTMLAttributes<HTMLDivElement>;
}

export interface CustomLeaf {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  superscript?: boolean;
  subscript?: boolean;
  color?: string;
  bgColor?: string;
  fontSize?: string;
  fontFamily?: string;
}

export type ToolbarOption = {
  text: string;
  value: string;
  image?: string;
};

export type ToolbarElement = {
  id: number;
  format: string;
  type: 'dropdown' | 'mark' | 'block' | 'embed' | 'color-picker' | 'popover';
  options?: ToolbarOption[];
};

export type ToolbarGroup = ToolbarElement[];

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
