import { Injectable } from '@nestjs/common';
import { Repository, FindOneOptions, FindOptionsWhere } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IUsersService } from '../interfaces';
import { CreateUserAttrs, User } from '../types';
import { UsersEntity } from '../entities';

@Injectable()
export class TypeOrmUsersService implements IUsersService {
  public constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepo: Repository<UsersEntity>,
  ) {}

  public create(attrs: CreateUserAttrs): Promise<User> {
    const newUser = this.usersRepo.create(attrs);
    return this.usersRepo.save(newUser);
  }

  public findOne(filter: FindOneOptions<UsersEntity>): Promise<User | null> {
    return this.usersRepo.findOne(filter);
  }

  public findOneBy(
    filter: FindOptionsWhere<UsersEntity>,
  ): Promise<User | null> {
    return this.usersRepo.findOneBy(filter);
  }
}
