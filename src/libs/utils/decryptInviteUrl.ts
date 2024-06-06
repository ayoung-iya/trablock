import crypto from 'crypto';

interface EncryptedData {
  iv: Buffer;
  content: string;
  secretKey: Buffer;
}

export default function decryptInviteUrl(encryptedData: EncryptedData) {
  const { iv, content, secretKey } = encryptedData;
  const decipher = crypto.createCipheriv('aes-128-cbc', secretKey, iv);
  let decrypted = decipher.update(content, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}
