import profileService from '@/apis/useProfileService/fetch';

import ProfileContainer from './components/ProfileContainer';

interface PageProps {
  params: {
    userId: string;
  };
}

export default async function ProfilePage({ params }: PageProps) {
  const { userId } = params;
  const userProfile = await profileService.getProfile(userId);

  return <ProfileContainer initialUserProfile={userProfile} />;
}
