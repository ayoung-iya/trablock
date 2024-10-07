'use client';

import React from 'react';

import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { ProfileUser } from '@/apis/useProfileService/type';
import revalidateServerTag from '@/apis/utils/revalidateServerTag';
import ImageBox from '@/components/common/ImageBox';
import logout from '@/icons/logout.svg?url';
import profileDefaultUrl from '@/icons/profile-default.svg?url';

export default function UserGNBButton({ profileData }: { profileData: ProfileUser }) {
  const router = useRouter();

  const handleLogout: React.MouseEventHandler = () => {
    Cookies.remove('authorization-token');
    Cookies.remove('expires-at');
    Cookies.remove('refresh-token');
    revalidateServerTag('trablock');

    router.push('/');
  };

  return (
    <>
      <li className="flex-row-center">
        <button type="button" className="size-6" onClick={handleLogout}>
          <ImageBox src={logout} alt="로그아웃" className="size-6" width={24} height={24} />
        </button>
      </li>
      <li>
        <Link href={`/profile/${profileData.id}`}>
          <ImageBox
            src={profileData.profileImgUrl || profileDefaultUrl}
            alt="Profile Image"
            className="size-9 rounded-full"
            width={36}
            height={36}
          />
        </Link>
      </li>
    </>
  );
}
