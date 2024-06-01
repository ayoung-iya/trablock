import Image from 'next/image';

// eslint-disable-next-line no-undef
export interface DefaultCardProps extends React.HTMLAttributes<HTMLButtonElement> {
  imageUrl: string;
  title: string;
}

export interface CircleCardProps extends DefaultCardProps {}

export default function CircleCard({ title, imageUrl, onClick }: CircleCardProps) {
  return (
    <button className="relative size-40 overflow-hidden rounded-full" type="button" onClick={onClick}>
      <Image src={imageUrl} alt={imageUrl} width={40 * 4} height={40 * 4} className="image-cover" />
      <p className="absolute-center text-white">{title}</p>
    </button>
  );
}
