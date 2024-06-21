import PlanDetailContent from '@/app/(plan)/plan/detail/PlanDetailContent';
import PlanDetailMockImage from '@/images/planDetailMockImage.png';

export default function PlanDetailPage() {
  const initData = {
    imageUrl: PlanDetailMockImage,
    name: '일본 여행 가보자고',
    startAt: '2024.05.31',
    endAt: '2024.06.04'
  };

  return <PlanDetailContent initData={initData} />;
}
