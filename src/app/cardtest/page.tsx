/* eslint-disable max-len */

import CircleCard from '@/components/card/CircleCard';
import ReviewCard from '@/components/card/ReviewCard';

export default function Home() {
  const cardList = {
    circle: {
      imageUrl: 'https://picsum.photos/300/300',
      title: '보라카이'
    },
    review: {
      imageUrl: 'https://picsum.photos/800/800',
      title: '가족과 함께한 일본 여행',
      route: ['도쿄', '긴자', '오사카'],
      user: {
        name: '트래블',
        profileImg: 'https://picsum.photos/100/100'
      }
    }
  };

  return (
    <div className="flex-col-center gap-12 p-8">
      <div className="flex-row-center gap-4">
        <CircleCard {...cardList.circle} />
      </div>
      <ReviewCard {...cardList.review} />
    </div>
  );
}
