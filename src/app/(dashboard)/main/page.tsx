'use client';

import React from 'react';

import BannerArticleList from '@/components/BannerArticleList';
import BannerReviewList from '@/components/BannerReviewList';
import PopularPlaces from '@/components/common/PopluarPlaces/PopularPlaces';

export default function Page() {
  return (
    <div className="container mx-auto">
      <PopularPlaces />
      <BannerArticleList />
      <BannerReviewList />
    </div>
  );
}
