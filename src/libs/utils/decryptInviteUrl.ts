import crypto from 'crypto';

interface decryptedInvitedProps {
  data: string;
  secretKey: Buffer;
}
export default function decryptInviteUrl(decryptInviteProp: decryptedInvitedProps) {
  const { data, secretKey } = decryptInviteProp;
  const textParts = data.split(':');

  const ivString = textParts.shift();
  if (!ivString) {
    throw new Error('Invalid IV format');
  }

  const iv = Buffer.from(ivString, 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv('aes-128-cbc', secretKey, iv);
  let decrypted = decipher.update(encryptedText);

  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
}
