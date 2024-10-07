import { ProfileUpdateData } from '@/apis/useProfileService/type';

const formatProfileDataForRequest = ({ name, introduce }: ProfileUpdateData) => {
  return name ? { nickname: name, introduce } : { introduce };
};

export default formatProfileDataForRequest;
