'use client';

import React from 'react';

import BannerArticleList from '@/components/BannerArticleList';
import PopularPlaces from '@/components/common/PopluarPlaces/PopularPlaces';

export default function Page() {
  return (
    <div className="container mx-auto">
      <PopularPlaces />
      <h1 className="my-4 text-2xl font-bold">Banner Articles</h1>
      <BannerArticleList />
    </div>
  );
}
