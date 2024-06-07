import crypto from 'crypto';

import cryptoLength from '@/constants/cryptoData';

export default function encryptInviteUrl(date: Date, planId: string) {
  const data = date.toString() + planId.toString();
  console.log(data);
  const secretKey = crypto.randomBytes(cryptoLength);
  const iv = crypto.randomBytes(cryptoLength);

  const cipher = crypto.createCipheriv('aes-128-cbc', Buffer.from(secretKey), iv);
  let encrypted = cipher.update(data);

  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return { data: `${iv.toString('hex')}:${encrypted.toString('hex')}`, secretKey };
}
