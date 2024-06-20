'use client';

import React, { useState, useEffect } from 'react';

import mockProfile from '@/components/common/profile/mockProfiles.json';
import ProfileContainer from '@/components/common/profile/ProfileContainer';

export default function Home() {
  const [profile, setProfile] = useState({
    name: '',
    bio: '',
    imageUrl: ''
  });

  useEffect(() => {
    // 초기 데이터 로드
    setProfile((prevProfile) => ({
      ...prevProfile,
      ...mockProfile
    }));
  }, []);

  const handleSave = (newName: string, newBio: string, newImageUrl: string) => {
    setProfile({
      name: newName,
      bio: newBio,
      imageUrl: newImageUrl
    });
  };

  return (
    <div className="container mx-auto p-4">
      <ProfileContainer profile={profile} onSave={handleSave} />
    </div>
  );
}
