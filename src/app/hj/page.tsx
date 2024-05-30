import PlanBadge from '@/components/common/badge/planBadge';

export default function hj() {
  const WHO = ['혼자', '친구와', '연인과', '배우자와', '아이와', '부모님과', '기타'];

  return (
    <div>
      {WHO.map((badge) => (
        <PlanBadge key={badge} text={badge} />
      ))}
    </div>
  );
}
