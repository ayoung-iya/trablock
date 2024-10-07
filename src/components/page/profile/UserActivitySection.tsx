'use client';

import React, { Suspense, useState } from 'react';

import { ErrorBoundary } from 'react-error-boundary';

import ErrorFallback from '@/components/ErrorFallback';
import BookmarkList from '@/components/page/profile/BookmarkList';
import PlanList from '@/components/page/profile/PlanList';
import ProfileTabList from '@/components/page/profile/ProfileTabList';
import ReviewList from '@/components/page/profile/ReviewList';
import ProfileReviewCardSkeleton from '@/components/skeleton/ProfileReviewCardSkeleton';
import SkeletonList from '@/components/skeleton/SkeletonList';
import TravelDetailCardSkeleton from '@/components/skeleton/TravelDetailCardSkeleton';
import { PROFILE_CONTENT_TAB_LIST, ProfileContentTab } from '@/libs/constants/profileTabList';

export default function UserActivitySection({ userId }: { userId: string }) {
  const [currentTab, setCurrentTab] = useState<ProfileContentTab>(PROFILE_CONTENT_TAB_LIST[0]);

  const handleTabClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    setCurrentTab(e.currentTarget.id as ProfileContentTab);
  };

  return (
    <div className="flex flex-grow flex-col gap-5">
      <ProfileTabList activePage={currentTab} onClickTab={handleTabClick} />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        {currentTab === 'plan' && (
          <Suspense
            fallback={
              <ul className="flex flex-wrap gap-[18px] md:gap-5">
                <SkeletonList count={3} SkeletonComponent={TravelDetailCardSkeleton} />
              </ul>
            }
          >
            <PlanList userId={userId} />
          </Suspense>
        )}
        {currentTab === 'review' && (
          <ul className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3">
            <Suspense fallback={<SkeletonList count={6} SkeletonComponent={ProfileReviewCardSkeleton} />}>
              <ReviewList userId={userId} />
            </Suspense>
          </ul>
        )}
        {currentTab === 'bookmark' && (
          <Suspense
            fallback={
              <ul className="flex flex-wrap gap-[18px] md:gap-5">
                <SkeletonList count={3} SkeletonComponent={TravelDetailCardSkeleton} />
              </ul>
            }
          >
            <BookmarkList userId={userId} />
          </Suspense>
        )}
      </ErrorBoundary>
    </div>
  );
}
