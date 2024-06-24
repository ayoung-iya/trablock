'use client';

import PopularPlaces from '@/components/common/PopluarPlaces/PopularPlaces';
import LandingSearchInput from '@/components/LandingSearchInput';

export default function home() {
  return (
    <div>
      Page
      <LandingSearchInput />
      <PopularPlaces />
    </div>
  );
}
