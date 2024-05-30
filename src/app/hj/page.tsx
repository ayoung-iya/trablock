import BlockBadge from '@/components/common/badge/blockBadge';

export default function hj() {
  const CATEGORY = [
    { text: '관광지', bgColor: 'bg-blue-200', textColor: 'text-black', borderColor: 'border-blue-500' },
    { text: '식당', bgColor: 'bg-red-200', textColor: 'text-black', borderColor: 'border-red-500' },
    { text: '교통', bgColor: 'bg-yellow-200', textColor: 'text-black', borderColor: 'border-yellow-500' },
    { text: '엑티비티', bgColor: 'bg-purple-500', textColor: 'text-white', borderColor: 'border-purple-700' },
    { text: '숙소', bgColor: 'bg-green-200', textColor: 'text-black', borderColor: 'border-green-500' },
    { text: '직접만들기', bgColor: 'bg-gray-200', textColor: 'text-black', borderColor: 'border-gray-500' }
  ];
  return (
    <div>
      {CATEGORY.map((badge) => (
        <BlockBadge
          key={badge.text}
          text={badge.text}
          bgColor={badge.bgColor}
          textColor={badge.textColor}
          borderColor={badge.borderColor}
        />
      ))}
    </div>
  );
}
