import crypto from 'crypto';

export default function encryptInviteUrl(date: Date, planId: string) {
  const data = date + planId;
  const dataEncode = crypto.createHash('sha256').update(data).digest('base64url');

  return dataEncode;
}
