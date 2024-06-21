import { Transforms, Editor } from 'slate';

import createParagraph from './paragraph';

interface EmbedData {
  url: string;
  width?: string;
  height?: string;
}

interface ImageNode extends EmbedData {
  type: 'image';
  alt: string;
  children: { text: string }[];
}

// Define the Video Node type
interface VideoNode extends EmbedData {
  type: 'video';
  children: { text: string }[];
}

// Function to create an image node
export const createImageNode = (alt: string, { url, width, height }: EmbedData): ImageNode => ({
  type: 'image',
  alt,
  url,
  width,
  height,
  children: [{ text: '' }]
});

// Function to create a video node
export const createVideoNode = ({ url, width, height }: EmbedData): VideoNode => ({
  type: 'video',
  url,
  width,
  height,
  children: [{ text: '' }]
});

// Function to insert an embed (image or video) into the editor
export const insertEmbed = (editor: Editor, embedData: EmbedData, format: 'image' | 'video'): void => {
  const { url, width, height } = embedData;
  if (!url) return;

  // Create a new object with modified properties
  const newEmbedData = {
    ...embedData,
    width: width ? `${width}px` : '100%',
    height: height ? `${height}px` : 'auto'
  };

  const embed = format === 'image' ? createImageNode('EditorImage', newEmbedData) : createVideoNode(newEmbedData);

  console.log(format);
  Transforms.insertNodes(editor, embed, { select: true });
  Transforms.insertNodes(editor, createParagraph(''), { mode: 'highest' });
};
