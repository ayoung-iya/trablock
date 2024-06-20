'use client';

// import CircleCard from '@/components/card/CircleCard';
import ReviewCard from '@/components/card/ReviewCard';
import TravelCard from '@/components/card/TravelCard';
// import LogoSvg from '@/icons/logo.svg';

export default function Home() {
  const cardList = {
    circle: {
      imageUrl: 'https://picsum.photos/300/300',
      title: '보라카이'
    },
    reviewDefault: {
      imageUrl: 'https://picsum.photos/800/800',
      title: '가족과 함께한 일본 여행',
      city: ['오사카'],
      name: '트래블',
      profileImageUrl: 'https://picsum.photos/100/100',
      startAt: '2024.8.12',
      endAt: '2024.8.16',
      onClick: () => alert('카드를 클릭했습니다!')
    },
    reviewMain: {
      imageUrl: 'https://picsum.photos/800/800',
      title: '가족과 함께한 일본 여행',
      city: ['도쿄', '긴자', '오사카'],
      name: '트래블',
      profileImageUrl: 'https://picsum.photos/100/100',
      type: 'main' as const,
      onClick: () => alert('카드를 클릭했습니다!')
    },
    travel: {
      id: '1',
      title: '가족과 함께한 일본 여행',
      city: ['도쿄', '긴자', '오사카'],
      startAt: '2024-08-12',
      endAt: '2024-08-16',
      travelCompanion: '가족과 함께',
      travelStyle: ['혼자서', '핫플레이스'],
      name: '트래블',
      profileImageUrl: 'https://picsum.photos/100/100',
      thumbnailImageUrl: 'https://picsum.photos/800/800',
      price: 1000000,
      bookmarkCount: 23,
      isBookmarked: true,
      isEditable: true,
      isPlanTab: true,
      onClick: () => alert('카드를 클릭했습니다!')
    }
  };

  return (
    <div className="flex-col-center gap-12 p-8">
      {/* <LogoSvg className="h-32 w-60 border border-solid" /> */}
      <div className="flex-row-center gap-4">{/* <CircleCard {...cardList.circle} /> */}</div>
      <ReviewCard {...cardList.reviewDefault} />
      <ReviewCard {...cardList.reviewMain} />
      <TravelCard {...cardList.travel} />
    </div>
  );
}
