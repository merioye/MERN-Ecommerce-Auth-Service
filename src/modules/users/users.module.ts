import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersServiceToken } from './constants';
import { TypeOrmUsersService } from './services';
import { UsersEntity } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  providers: [{ provide: UsersServiceToken, useClass: TypeOrmUsersService }],
  exports: [{ provide: UsersServiceToken, useClass: TypeOrmUsersService }],
})
export class UsersModule {}
