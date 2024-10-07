import PROFILE_SERVICE from '@/apis/useProfileService/fetch';
import ProfileManager from '@/components/card/ProfileManager';

export default async function ProfilePage({ params: { userId } }: { params: { userId: string } }) {
  const userProfile = await PROFILE_SERVICE.getProfile(userId);

  return (
    <div className="flex flex-col md:gap-10 lg:flex-row lg:items-start lg:gap-12 lg:pt-14">
      <ProfileManager userProfile={userProfile} />
    </div>
  );
}
