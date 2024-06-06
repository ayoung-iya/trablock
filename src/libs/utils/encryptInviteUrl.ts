import crypto from 'crypto';

import cryptoLength from '@/constants/cryptoData';

export default function encryptInviteUrl(date: Date, planId: string) {
  const data = date + planId;
  const secretKey = crypto.randomBytes(cryptoLength);
  const iv = crypto.randomBytes(cryptoLength);

  const cipher = crypto.createCipheriv('aes-128-cbc', secretKey, iv);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return { iv, content: encrypted, secretKey };
}
