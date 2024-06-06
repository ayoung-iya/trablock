import enCryptInviteUrl from '@/libs/utils/encryptInviteUrl';

export default function gaeun() {
  const date = new Date();
  console.log(date);
  enCryptInviteUrl(date, '12243l4kjlkjsdf');
  return <>가은</>;
}
