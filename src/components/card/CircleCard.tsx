import Image from 'next/image';

import { DefaultCardProps } from '@/components/card/type';

export interface CircleCardProps extends DefaultCardProps {}

export default function CircleCard({ title, imageUrl, onClick }: CircleCardProps) {
  return (
    <button className="relative size-40 overflow-hidden rounded-full" type="button" onClick={onClick}>
      <Image src={imageUrl} alt={imageUrl} width={40 * 4} height={40 * 4} className="image-cover" />
      <p className="absolute-center text-white">{title}</p>
    </button>
  );
}
