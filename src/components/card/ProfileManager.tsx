'use client';

import React, { useState } from 'react';

import { ProfileUser } from '@/apis/useProfileService/type';
import ProfileCard from '@/components/card/ProfileCard';
import ProfileEditCard from '@/components/card/ProfileEditCard';

interface ProfileManagerProps {
  userProfile: ProfileUser;
}

export default function ProfileManager({ userProfile }: ProfileManagerProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditStart = () => {
    setIsEditing(true);
  };

  const handleEditEnd = () => {
    setIsEditing(false);
  };

  return isEditing ? (
    <ProfileEditCard {...userProfile} onEndEdit={handleEditEnd} />
  ) : (
    <ProfileCard {...userProfile} onStartEdit={handleEditStart} />
  );
}
