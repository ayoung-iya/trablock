import crypto from 'crypto';

export default function encryptInviteUrl(date: Date, planId: string) {
  const data = date + planId;
  const secretKey = crypto.randomBytes(16);
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv('aes-128-cbc', secretKey, iv);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return { iv: iv.toString('hex'), content: encrypted };
}
