import { BaseEditor, Descendant } from 'slate';
import { HistoryEditor } from 'slate-history';
import { ReactEditor } from 'slate-react';

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
  [key: string]: any;
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
