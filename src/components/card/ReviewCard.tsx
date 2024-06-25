/* eslint-disable max-len */

import Link from 'next/link';

import ImageBox from '@/components/common/ImageBox';

export interface ReviewCardProps {
  reviewId: number;
  imageUrl: string;
  title: string;
  city: string[];
  name?: string;
  profileImageUrl?: string | null;
  startAt?: string;
  endAt?: string;
  type?: 'default' | 'main';
}

const isValidUrl = (url: string | null | undefined): boolean => {
  if (!url) {
    return false;
  }
  try {
    // eslint-disable-next-line no-new
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export default function ReviewCard({
  reviewId,
  imageUrl,
  title,
  city,
  name,
  profileImageUrl = null,
  startAt,
  endAt,
  type = 'default'
}: ReviewCardProps) {
  const cityString = city.join(', ');

  const getClassNames = () => {
    if (type === 'main') {
      // 이미지 크기는 피그마 시안에 따라 임의로 저장, 캐러셀에 따라서 수정예정
      return 'w-full h-[240px] md:w-[285px] md:h-[220px]';
    }
    return 'w-[156px] h-[156px] sm:w-[210px] sm:h-[210px] md:w-[236px] md:h-[236px]';
  };

  const validImageUrl: string = isValidUrl(imageUrl) ? imageUrl : '/icons/article-default.svg';
  const profileImgUrl = profileImageUrl ?? '/icons/profile-default.svg';
  const validProfileImageUrl: string = isValidUrl(profileImgUrl) ? profileImgUrl : '/icons/profile-default.svg';

  return (
    <Link href={`/review/${reviewId}`} passHref>
      <div
        className={`relative overflow-hidden rounded-lg bg-gray-200 shadow-[0_0_10px_0_rgba(0,0,0,0.08)] ${getClassNames()} `}
      >
        <ImageBox className="size-full" src={validImageUrl} alt={imageUrl} width={80} height={80} />
        <div className="absolute inset-0 z-10 w-full bg-black-01 opacity-20" />
        <div className="absolute bottom-4 left-4 z-20">
          <p className="font-subtitle-1 mb-1 text-white-01">{title}</p>
          {type === 'default' && (
            <>
              <p className="font-subtitle-3 hidden text-gray-02 sm:block">{cityString}</p>
              <p className="font-subtitle-3 hidden text-gray-02 sm:block">
                {startAt} ~ {endAt}
              </p>
            </>
          )}
          {type === 'main' && (
            <>
              <p className="font-subtitle-3 text-gray-02">{cityString}</p>
              <div className="mt-3 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="relative h-8 w-8 overflow-hidden rounded-full">
                    <ImageBox
                      className="h-full w-full"
                      src={validProfileImageUrl}
                      alt="profileImageUrl"
                      width={32}
                      height={32}
                    />
                  </div>
                  <span className="font-caption-2 text-gray-02">{name}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
