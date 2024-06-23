'use client';

import OrderFilterSection from '@/components/OrderFilterSection';

export default function Search({ searchParams }: { searchParams: { [key: string]: string } }) {
  const { keyword } = searchParams;

  return (
    <div className="mx-5 my-5">
      <h1 className="font-title-2 md:font-title-3 mb-3 whitespace-nowrap">
        &lsquo;{decodeURIComponent(keyword)}&rsquo; 여행 계획 검색 결과
      </h1>
      <div className="flex-row-center justify-between">
        <span className="font-caption-1 flex-shrink-0 md:text-lg">전체 50개</span>
        <OrderFilterSection />
      </div>
    </div>
  );
}
