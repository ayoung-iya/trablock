import React, { useEffect, useState } from 'react';

import ProfileCard from '@/components/common/profile/ProfileCard';

interface Profile {
  name: string;
  introduce?: string | null;
  imageUrl?: string | null;
}

interface ProfileContainerProps {
  profile: Profile;
  onSave: (newName: string, newIntroduce: string, newImage: File | string | null) => void;
}

export default function ProfileContainer({ profile, onSave }: ProfileContainerProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState<Profile>({
    name: '',
    introduce: null,
    imageUrl: null
  });

  const [tempImageFile, setTempImageFile] = useState<File | null>(null);

  useEffect(() => {
    setTempProfile({
      name: profile.name,
      introduce: profile.introduce ?? '',
      imageUrl: profile.imageUrl ?? null // ensure null if undefined
    });
    setTempImageFile(null); // Reset temp image file
  }, [profile]);

  const handleEdit = () => {
    setTempProfile({
      name: profile.name,
      introduce: profile.introduce ?? '',
      imageUrl: profile.imageUrl ?? null // ensure null if undefined
    });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setTempProfile({
      name: profile.name,
      introduce: profile.introduce ?? '',
      imageUrl: profile.imageUrl ?? null // ensure null if undefined
    });
    setTempImageFile(null); // Reset temp image file
    setIsEditing(false);
  };

  const handleTempChange = (key: keyof Profile, value: string | null) => {
    setTempProfile((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleImageChange = (file: File | string) => {
    const imageUrl = typeof file === 'string' ? file : URL.createObjectURL(file);
    setTempProfile((prev) => ({
      ...prev,
      imageUrl // remove null fallback here
    }));
    if (file instanceof File) {
      setTempImageFile(file);
    }
  };

  const handleSave = () => {
    onSave(tempProfile.name, tempProfile.introduce ?? '', tempImageFile ?? tempProfile.imageUrl ?? null); // ensure null if undefined
    setIsEditing(false);
  };

  return (
    <ProfileCard
      name={tempProfile.name}
      bio={tempProfile.introduce ?? ''}
      imageUrl={tempProfile.imageUrl ?? ''}
      isEditing={isEditing}
      onEdit={handleEdit}
      onCancel={handleCancel}
      onSave={handleSave}
      onImageChange={handleImageChange}
      onNameChange={(newName) => handleTempChange('name', newName)}
      onBioChange={(newIntroduce) => handleTempChange('introduce', newIntroduce)}
      canEdit
    />
  );
}
