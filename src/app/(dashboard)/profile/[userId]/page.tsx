'use client';

import React, { useState, useEffect } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import getProfileService from '@/apis/useProfileService/fetchGetProfile';
import updateProfileService from '@/apis/useProfileService/fetchUpdateProfile';
import ProfileContainer from '@/components/common/profile/ProfileContainer';
import PlanList from '@/components/PlanList';
import ReviewList from '@/components/ReviewList';
import TabBar from '@/components/TabBar';

import bookmarkData from './bookmarkMock.json';
import planData from './planMock.json';
import reviewData from './reviewMock.json';

const queryClient = new QueryClient();

export default function ProfilePage({ params }: { params: { userId: string } }) {
  const { userId } = params;

  const [activeTab, setActiveTab] = useState('여행 계획');
  const [profile, setProfile] = useState({
    name: '',
    introduce: '',
    imageUrl: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getProfileService.getProfile(userId);
        setProfile({
          name: profileData.name,
          introduce: profileData.introduce ?? '',
          imageUrl: profileData.profile_img_url ?? '/icons/profile-default.svg'
        });
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleProfileSave = async (newName: string, newIntroduce: string, newImage: File | string | null) => {
    let file;
    if (typeof newImage === 'string' && newImage.startsWith('http')) {
      // URL인 경우 처리
      file = undefined;
    } else if (typeof newImage === 'object' && newImage !== null) {
      // 파일인 경우 처리
      file = newImage;
    }

    const updatedProfile = {
      nickname: newName || profile.name,
      introduce: newIntroduce || profile.introduce,
      file
    };

    try {
      const response = await updateProfileService.updateProfile(updatedProfile);
      setProfile({
        name: response.nickname ?? newName,
        introduce: response.introduce ?? '',
        imageUrl: response.profile_img_url ?? '/icons/profile-default.svg'
      });
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
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
          <main className="flex w-full flex-grow justify-center">
            <div className="w-full max-w-3xl">
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
