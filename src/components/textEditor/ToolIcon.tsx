import React from 'react';

import AlignCenterIcon from './icons/alignCenter.svg';
import AlignLeftIcon from './icons/alignLeft.svg';
import AlignRightIcon from './icons/alignRight.svg';
import BoldIcon from './icons/bold.svg';
import ImageIcon from './icons/image.svg';
import ItalicIcon from './icons/italic.svg';
import UnderlineIcon from './icons/underline.svg';

const iconList: {
  [key: string]: React.FC<React.SVGProps<SVGElement>>;
} = {
  bold: BoldIcon,
  italic: ItalicIcon,
  strikethrough: UnderlineIcon, // Update with the correct icon
  underline: UnderlineIcon,
  blockquote: UnderlineIcon, // Update with the correct icon
  superscript: UnderlineIcon, // Update with the correct icon
  subscript: UnderlineIcon, // Update with the correct icon
  alignLeft: AlignLeftIcon,
  alignCenter: AlignCenterIcon,
  alignRight: AlignRightIcon,
  orderedList: UnderlineIcon, // Update with the correct icon
  unorderedList: UnderlineIcon, // Update with the correct icon
  image: ImageIcon,
  add: UnderlineIcon // Update with the correct icon
};

interface IconProps {
  icon: keyof typeof iconList;
}

function Icon({ icon }: IconProps) {
  const SvgIcon = iconList[icon];
  return SvgIcon ? <SvgIcon /> : null;
}

export default Icon;
