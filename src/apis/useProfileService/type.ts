export interface ProfileUserData {
  profileImgUrl?: string;
  name: string;
  introduce?: string;
  isEditable: boolean;
}

export interface ProfileUser extends ProfileUserData {
  id: string;
}

export interface ProfileUpdateData extends Partial<Pick<ProfileUserData, 'name' | 'introduce'>> {}

export interface UpdateProfileResponse {
  nickname: string;
  profile_img_url: string | null;
  introduce: string | null;
}
