import React, { useEffect, useState } from 'react';

import ProfileCard from '@/components/common/profile/ProfileCard';

interface Profile {
  name: string;
  bio?: string;
  imageUrl?: string;
}

interface ProfileContainerProps {
  profile: Profile;
  onSave: (newName: string, newBio: string, newImageUrl: string) => void;
}

export default function ProfileContainer({ profile, onSave }: ProfileContainerProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState<Profile>({
    name: '',
    bio: '',
    imageUrl: ''
  });

  useEffect(() => {
    setTempProfile({
      name: profile.name,
      bio: profile.bio || '',
      imageUrl: profile.imageUrl || ''
    });
  }, [profile]);

  const handleEdit = () => {
    setTempProfile({
      name: profile.name,
      bio: profile.bio || '',
      imageUrl: profile.imageUrl || ''
    });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setTempProfile({
      name: profile.name,
      bio: profile.bio || '',
      imageUrl: profile.imageUrl || ''
    });
    setIsEditing(false);
  };

  const handleTempChange = (key: keyof Profile, value: string) => {
    setTempProfile((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    onSave(tempProfile.name, tempProfile.bio!, tempProfile.imageUrl!);
    setIsEditing(false);
  };

  return (
    <ProfileCard
      name={tempProfile.name}
      bio={tempProfile.bio}
      imageUrl={tempProfile.imageUrl}
      isEditing={isEditing}
      onEdit={handleEdit}
      onCancel={handleCancel}
      onSave={handleSave}
      onImageChange={(newImageUrl) => handleTempChange('imageUrl', newImageUrl)}
      onNameChange={(newName) => handleTempChange('name', newName)}
      onBioChange={(newBio) => handleTempChange('bio', newBio)}
      canEdit
    />
  );
}
