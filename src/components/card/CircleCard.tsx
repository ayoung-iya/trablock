import Image from 'next/image';

interface CircleCardProps {
  title: string;
  imageUrl: string;
}

export default function CircleCard({ title, imageUrl }: CircleCardProps) {
  return (
    <div className="relative size-40 overflow-hidden rounded-full">
      <Image src={imageUrl} alt={imageUrl} width={40 * 4} height={40 * 4} className="image-cover" />
      <p className="absolute-center text-white">{title}</p>
    </div>
  );
}
