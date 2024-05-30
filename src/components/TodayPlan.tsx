import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

type TodayPlanProps = {
  ImageUrl: StaticImageData;
  TravelTitle: string;
  TravelDate: string;
  TravelSite: string;
};
export default function TodayPlan({ ImageUrl, TravelTitle, TravelDate, TravelSite }: TodayPlanProps) {
  return (
    <Link href="/">
      <div className="left-5f lex align-center translate-x-2/4transform fixed bottom-0 left-2/4 h-1/4 w-1/4 -translate-x-1/2 justify-center bg-teal-300">
        <div className="relative h-1/2 w-1/4 rounded-full">
          <Image src={ImageUrl} fill alt="TravelImage" />
        </div>
        <div>
          <h1>{TravelTitle}</h1>
          <p>{TravelDate}</p>
          <p>{TravelSite}</p>
        </div>
      </div>
    </Link>
  );
}
