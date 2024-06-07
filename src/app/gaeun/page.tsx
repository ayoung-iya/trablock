import decryptInviteUrl from '@/libs/utils/decryptInviteUrl';
import encryptInviteUrl from '@/libs/utils/encryptInviteUrl';

export default function gaeun() {
  const date = new Date();
  console.log(date);

  const encrypedData = encryptInviteUrl(date, '12lif3');
  console.log(encrypedData);

  const decryptedData = decryptInviteUrl(encrypedData);
  console.log(decryptedData);
  return <>가은</>;
}
