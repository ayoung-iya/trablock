/* eslint-disable max-len */
import React from 'react';

import Image from 'next/image';

import { Article } from '@/apis/useArticle/article.type';
import profileDefault from '@/icons/profile-default.svg?url';

interface TravelPreviewCardProps extends Omit<Article, 'bookmarkCount' | 'isBookmarked' | 'isEditable' | 'locations'> {
  cities: string[];
}

function CardTitle({ children }: React.PropsWithChildren) {
  return <span className="font-subtitle-2 md:font-subtitle-2 text-white-01">{children}</span>;
}

function CardInfo({ children }: React.PropsWithChildren) {
  return <span className="font-subtitle-3 text-gray-02">{children}</span>;
}

function CardProfile({ profileImgUrl, name }: Pick<TravelPreviewCardProps, 'profileImgUrl' | 'name'>) {
  return (
    <div className="flex-row-center gap-2">
      <Image
        src={profileImgUrl || profileDefault}
        alt={`${name} 프로필`}
        width={32}
        height={32}
        className="rounded-full bg-gray-02"
      />
      <span className="font-caption-2 text-white-01">{name}</span>
    </div>
  );
}

function CardMain({ children }: React.PropsWithChildren) {
  return (
    <div className="relative h-60 min-w-72 overflow-hidden rounded-[10px] bg-gray-02 md:h-64 lg:h-[220px] lg:min-w-[285px]">
      <div className="absolute bottom-0 z-10 h-3/5 w-full bg-gradient-to-t from-black/60 to-transparent lg:h-3/4" />
      {children}
    </div>
  );
}

function CardMainSquare({ children }: React.PropsWithChildren) {
  return (
    <div className="relative aspect-square size-full overflow-hidden rounded-[10px] bg-gray-02 before:absolute before:inset-0 before:bg-second-logo before:bg-[length:160px] before:bg-center before:bg-no-repeat">
      <div className="absolute bottom-0 z-10 h-2/4 w-full bg-gradient-to-t from-black/60 to-transparent" />
      {children}
    </div>
  );
}

const TravelPreviewCard = Object.assign(CardMain, {
  MainSquare: CardMainSquare,
  Title: CardTitle,
  Info: CardInfo,
  Profile: CardProfile
});

export default TravelPreviewCard;
