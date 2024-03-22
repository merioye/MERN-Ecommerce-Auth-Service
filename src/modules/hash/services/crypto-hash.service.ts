import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomBytes, createHash, scrypt } from 'crypto';
import { IHashService } from '../interfaces';
import { CONFIG, HASHING_ALGORITHM } from '../../../constants';

@Injectable()
export class CryptoHashService implements IHashService {
  private algorithm;

  public constructor(private readonly configService: ConfigService) {
    this.algorithm = this.configService.get<HASHING_ALGORITHM>(
      CONFIG.HASHING_ALGORITHM,
    );
  }

  public async hash(data: string): Promise<string> {
    const saltBuffer = randomBytes(16);
    const derivedKey = await this.scryptAsync(data, saltBuffer);
    const hash = createHash(this.algorithm).update(derivedKey).digest('hex');
    return `${hash}.${saltBuffer.toString('hex')}`;
  }

  public async compare(data: string, hashedData: string): Promise<boolean> {
    const [hash, salt] = hashedData.split('.');
    if (!hash || !salt) {
      return false;
    }

    const saltBuffer = Buffer.from(salt, 'hex');

    const derivedKey = await this.scryptAsync(data, saltBuffer);
    const newHash = createHash(this.algorithm).update(derivedKey).digest('hex');
    return newHash === hash;
  }

  private scryptAsync(data: string, salt: Buffer): Promise<Buffer> {
    const keyLength = 64;
    return new Promise((resolve, reject) => {
      scrypt(data, salt, keyLength, (err, derivedKey) => {
        if (err) {
          reject(err);
        } else {
          resolve(derivedKey);
        }
      });
    });
  }
}
