import SearchList from '@/components/SearchList';

export default function Search({ searchParams }: { searchParams: { [key: string]: string } }) {
  const { keyword = '', order } = searchParams;

  return (
    <div className="mx-5 my-5 max-w-[1200px] md:mx-auto md:px-7">
      <h1 className="font-title-2 md:font-title-3 mb-3 whitespace-nowrap">
        {keyword ? `‘${decodeURIComponent(keyword)}’` : '전체'} 여행 계획 검색 결과
      </h1>
      <SearchList keyword={keyword} order={order} />
    </div>
  );
}
