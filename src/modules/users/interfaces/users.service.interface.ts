import { FindOneOptions, FindOptionsWhere } from 'typeorm';
import { CreateUserAttrs, User } from '../types';
import { UsersEntity } from '../entities';

export interface IUsersService {
  create(attrs: CreateUserAttrs): Promise<User>;
  findOne(filter: FindOneOptions<UsersEntity>): Promise<User | null>;
  findOneBy(filter: FindOptionsWhere<UsersEntity>): Promise<User | null>;
}
