'use client';

import { useEffect, useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { useGetArticles, useGetBookmarks } from '@/apis/useContentService/useGetContent';
import useGetReview from '@/apis/useContentService/useGetReview';
import getProfileService from '@/apis/useProfileService/fetchGetProfile';
import updateProfileService from '@/apis/useProfileService/fetchUpdateProfile';
import ProfileContainer from '@/components/common/profile/ProfileContainer';
import PlanList from '@/components/PlanList';
import ReviewList from '@/components/ReviewList';
import TabBar from '@/components/TabBar';

const queryClient = new QueryClient();

export default function ProfilePage({ params }: { params: { userId: string } }) {
  const router = useRouter();
  const { userId } = params;
  const [activeTab, setActiveTab] = useState('여행 계획');
  const [profile, setProfile] = useState({
    name: '',
    introduce: '',
    imageUrl: '',
    isEditable: false
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const [profileError, setProfileError] = useState(false);

  const {
    data: articlesData,
    fetchNextPage: fetchNextArticlesPage,
    hasNextPage: hasNextArticlesPage,
    isFetching: isFetchingArticles,
    isFetchingNextPage: isFetchingNextArticlesPage,
    status: articlesStatus,
    refetch: refetchArticles
  } = useGetArticles(userId);

  const {
    data: bookmarksData,
    fetchNextPage: fetchNextBookmarksPage,
    hasNextPage: hasNextBookmarksPage,
    isFetching: isFetchingBookmarks,
    isFetchingNextPage: isFetchingNextBookmarksPage,
    status: bookmarksStatus,
    refetch: refetchBookmarks
  } = useGetBookmarks(userId);

  const {
    data: reviewsData,
    fetchNextPage: fetchNextReviewsPage,
    hasNextPage: hasNextReviewsPage,
    isFetching: isFetchingReviews,
    isFetchingNextPage: isFetchingNextReviewsPage,
    status: reviewsStatus,
    refetch: refetchReviews
  } = useGetReview(userId);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getProfileService.getProfile(userId);
        setProfile({
          name: profileData.name,
          introduce: profileData.introduce ?? '',
          imageUrl: profileData.profile_img_url ?? '/icons/profile-default.svg',
          isEditable: profileData.is_editable ?? false
        });
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        router.push('/');
        setProfileError(true);
      }
    };

    fetchProfile();
  }, [userId]);

  useEffect(() => {
    if (activeTab === '여행 계획') {
      refetchArticles();
    } else if (activeTab === '여행 후기') {
      refetchReviews();
    } else if (activeTab === '북마크') {
      refetchBookmarks();
    }
  }, [activeTab, refetchArticles, refetchReviews, refetchBookmarks]);

  const handleProfileSave = async (newName: string, newIntroduce: string, newImage: string | File | null) => {
    let file: string | File | undefined = newImage || undefined;
    if (!newImage) {
      file = profile.imageUrl;
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
        imageUrl: response.profile_img_url ?? '/icons/profile-default.svg',
        isEditable: profile.isEditable
      });
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case '여행 계획':
        return (
          <PlanList
            key="여행 계획"
            data={articlesData}
            fetchNextPage={fetchNextArticlesPage}
            hasNextPage={hasNextArticlesPage}
            isFetching={isFetchingArticles}
            isFetchingNextPage={isFetchingNextArticlesPage}
            status={articlesStatus}
            isPlanTab
          />
        );
      case '여행 후기':
        return (
          <ReviewList
            key="여행 후기"
            data={reviewsData}
            fetchNextPage={fetchNextReviewsPage}
            hasNextPage={hasNextReviewsPage}
            isFetching={isFetchingReviews}
            isFetchingNextPage={isFetchingNextReviewsPage}
            status={reviewsStatus}
          />
        );
      case '북마크':
        return (
          <PlanList
            key="북마크"
            data={bookmarksData}
            fetchNextPage={fetchNextBookmarksPage}
            hasNextPage={hasNextBookmarksPage}
            isFetching={isFetchingBookmarks}
            isFetchingNextPage={isFetchingNextBookmarksPage}
            status={bookmarksStatus}
            isPlanTab={false}
          />
        );
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
            <ProfileContainer profile={profile} onSave={handleProfileSave} canEdit={profile.isEditable} />
          </aside>
          <main className="mt-4 flex w-full flex-grow justify-center">
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
