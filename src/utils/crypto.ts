import * as config from 'config';
import * as crypto from 'crypto';

const serverConfig = config.get('server');
const algorithm = 'aes-256-ctr';
const ENCRYPTION_KEY = serverConfig.secretKey;
const IV_LENGTH = 16;

export default class LocalCrypto {
  static async encrypt (text: string): Promise<string> {
    const iv = crypto.randomBytes(IV_LENGTH);

    const cipher = crypto.createCipheriv(
      algorithm,
      Buffer.concat([Buffer.from(ENCRYPTION_KEY), Buffer.alloc(32)], 32),
      iv,
    );

    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
  }

  static async decrypt (text: string): Promise<string> {
    const textParts = text.split(':');

    const iv = Buffer.from(textParts.shift(), 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');

    const decipher = crypto.createDecipheriv(
      algorithm,
      Buffer.concat([Buffer.from(ENCRYPTION_KEY), Buffer.alloc(32)], 32),
      iv,
    );

    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }
}
