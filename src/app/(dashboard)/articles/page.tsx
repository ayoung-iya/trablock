import ArticlesList from '@/components/ArticlesList';

export default function Articles() {
  return (
    <div className="mx-5 my-5 max-w-7xl md:mx-auto md:px-7">
      <h1 className="font-title-2 md:font-title-3 mb-3 whitespace-nowrap">전체 여행 계획</h1>
      <ArticlesList />
    </div>
  );
}
