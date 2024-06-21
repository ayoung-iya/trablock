'use client';

import React, { useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import ProfileContainer from '@/components/common/profile/ProfileContainer';
import PlanList from '@/components/PlanList';
import ReviewList from '@/components/ReviewList';
import TabBar from '@/components/TabBar';

import bookmarkData from './bookmarkMock.json';
import planData from './planMock.json';
import reviewData from './reviewMock.json';

const queryClient = new QueryClient();

const initialProfile = {
  name: '임시 사용자',
  bio: '안녕하세요, 임시 사용자입니다.',
  imageUrl: '/icons/profile-default.svg'
};

export default function TestPage() {
  const [activeTab, setActiveTab] = useState('여행 계획');
  const [profile, setProfile] = useState(initialProfile);

  const handleProfileSave = (newName: string, newBio: string, newImageUrl: string) => {
    setProfile({
      name: newName,
      bio: newBio,
      imageUrl: newImageUrl
    });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case '여행 계획':
        return <PlanList key="여행 계획" initialData={planData} isPlanTab />;
      case '여행 후기':
        return <ReviewList data={reviewData} />;
      case '북마크':
        return <PlanList key="북마크" initialData={bookmarkData} isPlanTab={false} />;
      default:
        return null;
    }
  };

  const handleTabBarClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="mx-auto max-w-screen-xl p-4">
        <div className="flex flex-col gap-4 lg:flex-row">
          <aside className="mb-4 w-full rounded-lg p-4 lg:mb-0 lg:w-[500px]">
            <ProfileContainer profile={profile} onSave={handleProfileSave} />
          </aside>
          <main className=" flex w-full flex-grow justify-center">
            <div className=" w-full max-w-3xl ">
              <TabBar
                tabBarList={['여행 계획', '여행 후기', '북마크']}
                handleTabBarClick={handleTabBarClick}
                size="S"
              />
              <div className="w-full">{renderTabContent()}</div>
            </div>
          </main>
        </div>
      </div>
    </QueryClientProvider>
  );
}
