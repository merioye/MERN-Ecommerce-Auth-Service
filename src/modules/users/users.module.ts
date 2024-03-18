import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersServiceToken } from './constants';
import { TypeOrmUsersService } from './typeorm-users.service';
import { UsersEntity } from './users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  providers: [{ provide: UsersServiceToken, useClass: TypeOrmUsersService }],
  exports: [{ provide: UsersServiceToken, useClass: TypeOrmUsersService }],
})
export class UsersModule {}
