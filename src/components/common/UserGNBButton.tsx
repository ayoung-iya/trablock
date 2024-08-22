'use client';

import React, { useEffect, useState } from 'react';

import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import useGetProfile from '@/apis/useProfileService/useGetProfile';
import ImageBox from '@/components/common/ImageBox';
import logout from '@/icons/logout.svg?url';
import ProfileDefault from '@/icons/profile-default.svg?url';

const DEFAULT_IMAGE_URL = ProfileDefault.src;

export default function UserGNBButton({
  hasAuthToken,
  initialUserId
}: {
  hasAuthToken: boolean;
  initialUserId: string;
}) {
  const authToken = Cookies.get('authorization-token') || '';

  const [isLoggedIn, setIsLoggedIn] = useState(hasAuthToken);
  const [userId, setUserId] = useState(initialUserId);
  const [profileImgURL, setProfileImgURL] = useState(DEFAULT_IMAGE_URL);
  const { data: profileData } = useGetProfile(`${userId}`);
  const router = useRouter();

  const handleLogout: React.MouseEventHandler = () => {
    Cookies.remove('authorization-token');
    Cookies.remove('expires-at');
    Cookies.remove('refresh-token');
    setIsLoggedIn(false);

    router.push('/');
  };

  useEffect(() => {
    if (authToken) {
      setIsLoggedIn(true);
      setUserId(`${jwtDecode<{ userId: number; exp: number }>(authToken).userId}`);
      setProfileImgURL(profileData?.profile_img_url || DEFAULT_IMAGE_URL);
    } else {
      setIsLoggedIn(false);
      setUserId('');
      setProfileImgURL(DEFAULT_IMAGE_URL);
    }
  }, [authToken, profileData]);

  if (isLoggedIn) {
    return (
      <>
        <li className="flex-row-center">
          <button type="button" className="size-6" onClick={handleLogout}>
            <ImageBox src={logout} alt="로그아웃" className="size-6" width={24} height={24} />
          </button>
        </li>
        <Link href={`/profile/${userId}`}>
          <li>
            <ImageBox src={profileImgURL} alt="Profile Image" className="size-9 rounded-full" width={36} height={36} />
          </li>
        </Link>
      </>
    );
  }

  return (
    <Link href="/login">
      <li>
        <button type="button" className="btn-solid btn-sm">
          로그인
        </button>
      </li>
    </Link>
  );
}
