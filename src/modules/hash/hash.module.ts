import { Module } from '@nestjs/common';
import { HashServiceToken } from './constants';
import { CryptoHashService } from './crypto-hash.service';

@Module({
  providers: [{ provide: HashServiceToken, useClass: CryptoHashService }],
  exports: [{ provide: HashServiceToken, useClass: CryptoHashService }],
})
export class HashModule {}
