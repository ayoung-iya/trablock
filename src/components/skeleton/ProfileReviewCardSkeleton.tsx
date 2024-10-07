import TravelPreviewCardSkeleton from '@/components/skeleton/TravelPreviewCardSkeleton';

export default function ProfileReviewCardSkeleton() {
  return (
    <TravelPreviewCardSkeleton.MainSquare>
      <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <TravelPreviewCardSkeleton.Title />
          <div className="hidden md:flex md:flex-col md:gap-[2px]">
            <TravelPreviewCardSkeleton.Info />
            <TravelPreviewCardSkeleton.Info />
          </div>
        </div>
      </div>
    </TravelPreviewCardSkeleton.MainSquare>
  );
}
