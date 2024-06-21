'use client';

import React, { useState, ChangeEvent } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Button from '@/components/common/button/Button';
import PlanList from '@/components/PlanList';
import ReviewList from '@/components/ReviewList';
import TabBar from '@/components/TabBar';

import bookmarkData from './bookmarkMock.json';
import planData from './planMock.json';
import reviewData from './reviewMock.json';

const queryClient = new QueryClient();

export default function TestPage() {
  const tempUserProfile = {
    profile_img_url: '/icons/profile-default.svg',
    name: '임시 사용자',
    introduce: '안녕하세요, 임시 사용자입니다.',
    is_editable: true
  };

  const [activeTab, setActiveTab] = useState('여행 계획');
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(tempUserProfile.profile_img_url);
  const [name, setName] = useState<string>(tempUserProfile.name);
  const [introduce, setIntroduce] = useState<string>(tempUserProfile.introduce);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(URL.createObjectURL(e.target.files[0]));
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
      <div className="container mx-auto p-4">
        <div className="flex">
          <aside className="w-1/4 rounded-lg bg-gray-100 p-4">
            <div className="flex flex-col items-center">
              {isEditing ? (
                <>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="mb-4" />
                  {profileImage && (
                    <img src={profileImage} alt="Profile" className="mb-4 h-24 w-24 rounded-full object-cover" />
                  )}
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mb-2 w-full rounded border px-2 py-1"
                  />
                  <input
                    type="text"
                    value={introduce}
                    onChange={(e) => setIntroduce(e.target.value)}
                    className="mb-4 w-full rounded border px-2 py-1"
                  />
                  <Button type="button" className="btn-primary btn-sm" onClick={handleSaveClick}>
                    확인
                  </Button>
                </>
              ) : (
                <>
                  <img
                    src={profileImage || '/icons/profile-default.svg'}
                    alt="Profile"
                    className="mb-4 h-24 w-24 rounded-full object-cover"
                  />
                  <h2 className="text-xl font-semibold">{name}</h2>
                  <p className="text-gray-500">{introduce}</p>
                  <button type="button" className="btn-solid btn-sm mt-4" onClick={handleEditClick}>
                    편집하기
                  </button>
                </>
              )}
            </div>
          </aside>
          <main className="w-full p-4">
            <TabBar tabBarList={['여행 계획', '여행 후기', '북마크']} handleTabBarClick={handleTabBarClick} size="S" />
            <div className="w-full">{renderTabContent()}</div>
          </main>
        </div>
      </div>
    </QueryClientProvider>
  );
}
