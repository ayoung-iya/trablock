/* eslint-disable max-len */
import React from 'react';

function CardTitle() {
  return <div className="h-5 w-full bg-gray-03" />;
}

function CardInfo() {
  return <div className="h-[18px] w-11/12 bg-gray-03" />;
}

function CardProfile() {
  return (
    <div className="flex-row-center gap-2">
      <div className="size-8 rounded-full bg-gray-03" />
      <div className="h-5 w-28 bg-gray-03" />
    </div>
  );
}

function CardMain({ children }: React.PropsWithChildren) {
  return (
    <div className="relative h-60 min-w-72 animate-pulse overflow-hidden rounded-[10px] bg-gray-02 md:h-64 lg:h-[220px] lg:min-w-[285px]">
      {children}
    </div>
  );
}

function CardMainSquare({ children }: React.PropsWithChildren) {
  return (
    <div className="relative aspect-square size-full animate-pulse overflow-hidden rounded-[10px] bg-gray-02">
      {children}
    </div>
  );
}

const TravelPreviewCardSkeleton = Object.assign(CardMain, {
  MainSquare: CardMainSquare,
  Title: CardTitle,
  Info: CardInfo,
  Profile: CardProfile
});

export default TravelPreviewCardSkeleton;
