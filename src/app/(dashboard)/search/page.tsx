import type { Metadata } from 'next';

import SearchList from '@/components/SearchList';
import { PAGE_TITLES } from '@/libs/constants/title';

interface Params {
  searchParams: { [key: string]: string };
}

export async function generateMetadata({ searchParams }: Params): Promise<Metadata> {
  const { keyword = '' } = searchParams;

  return {
    title: PAGE_TITLES.search(keyword)
  };
}

export default function Search({ searchParams }: Params) {
  const { keyword = '', order } = searchParams;

  return (
    <>
      <h1 className="font-title-2 md:font-title-3 mb-3 whitespace-nowrap">
        {keyword ? `‘${decodeURIComponent(keyword)}’` : '전체'} 여행 계획 검색 결과
      </h1>
      <SearchList keyword={keyword} order={order} />
    </>
  );
}
