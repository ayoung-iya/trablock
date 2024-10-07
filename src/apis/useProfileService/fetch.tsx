import { fetchExtendedWithAuthToken, fetchExtendedWithoutContentType } from '@/apis/interceptors/fetchExtended';
import { ProfileUpdateData, ProfileUserData } from '@/apis/useProfileService/type';
import formatProfileDataForRequest from '@/apis/utils/formatProfileData';
import revalidateServerTag from '@/apis/utils/revalidateServerTag';

const PROFILE_SERVICE = Object.freeze({
  getProfile: async (id: string) => {
    const response = await fetchExtendedWithAuthToken<ProfileUserData>(`api/v1/profile/${id}`, {
      method: 'GET',
      next: { tags: ['trablock', 'profile', `user${id}`] }
    });

    return { id, ...response };
  },
  patchProfile: async (id: string, profileData: ProfileUpdateData) => {
    const response = await fetchExtendedWithAuthToken<ProfileUpdateData>(`api/v1/profile`, {
      method: 'PATCH',
      body: formatProfileDataForRequest(profileData)
    });

    revalidateServerTag(`user${id}`);

    return response;
  },
  putProfileImage: async (id: string, profileImgFile: File) => {
    const formData = new FormData();
    formData.append('file', profileImgFile);

    const response = await fetchExtendedWithoutContentType<{ profileImgUrl: string }>(`api/v1/profile/img`, {
      method: 'PUT',
      body: formData
    });

    revalidateServerTag(`user${id}`);

    return response;
  },
  deleteProfileImage: async (id: string) => {
    const response = await fetchExtendedWithAuthToken<{ profileImgUrl: null }>(`api/v1/profile/img`, {
      method: 'PATCH'
    });

    revalidateServerTag(`user${id}`);

    return response;
  }
});

export default PROFILE_SERVICE;
