import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHash } from 'crypto';
import { IHashService } from './interfaces';
import { CONFIG, HASHING_ALGORITHM } from '../../constants';

@Injectable()
export class CryptoHashService implements IHashService {
  private algorithm;

  public constructor(private readonly configService: ConfigService) {
    this.algorithm = this.configService.get<HASHING_ALGORITHM>(
      CONFIG.HASHING_ALGORITHM,
    );
  }

  public hash(data: string): Promise<string> {
    return new Promise((resolve) => {
      const hash = createHash(this.algorithm).update(data).digest('hex');
      resolve(hash);
    });
  }

  public compare(data: string, hash: string): Promise<boolean> {
    return this.hash(data).then((newHash) => newHash === hash);
  }
}
