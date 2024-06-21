// Define the type for the ParagraphNode
interface ParagraphNode {
  type: 'paragraph';
  children: { text: string }[];
}

// Function to create a paragraph node
const createParagraph = (text: string): ParagraphNode => ({
  type: 'paragraph',
  children: [{ text }]
});

export default createParagraph;
