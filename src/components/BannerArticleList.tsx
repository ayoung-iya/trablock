'use client';

import React, { useEffect, useState } from 'react';

import bannerService from '@/apis/useBannerArticle/fetch';
import { Article } from '@/apis/useBannerArticle/type';
import TravelCard from '@/components/card/TravelCard';

const getCookie = (name: string): string | undefined => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift();
  }
  return undefined;
};

export default function BannerList() {
  const [data, setData] = useState<Article[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getCookie('authorization-token');
        const result = await bannerService.getBannerArticles(token);
        setData(result);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {data?.map((article) => (
        <TravelCard
          key={article.article_id}
          id={article.article_id.toString()}
          title={article.title}
          city={article.location.map((loc) => loc.city)}
          startAt={article.start_at}
          endAt={article.end_at}
          travelCompanion={article.travel_companion}
          travelStyle={article.travel_styles}
          name={article.name}
          profileImageUrl={article.profile_image_url}
          thumbnailImageUrl={article.cover_image_url}
          price={article.expense ? Number(article.expense) : 0}
          bookmarkCount={article.bookmark_count}
          isBookmarked={article.is_bookmarked}
          isEditable={article.is_editable}
          isPlanTab={false}
          onClick={() => {}}
        />
      ))}
    </div>
  );
}
