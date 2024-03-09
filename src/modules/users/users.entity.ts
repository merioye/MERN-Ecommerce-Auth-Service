import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Check,
} from 'typeorm';
import { ROLE, SIGNUP_METHOD } from '../../constants';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 20,
  })
  first_name: string;

  @Column({
    type: 'varchar',
    length: 20,
  })
  last_name: string;

  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 20,
    default: '',
  })
  phone_no: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  profile_url: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  profile_key: string;

  @Column({
    type: 'enum',
    enum: SIGNUP_METHOD,
    default: SIGNUP_METHOD.MANUAL,
  })
  signup_method: SIGNUP_METHOD;

  @Column({
    type: 'enum',
    enum: ROLE,
    default: ROLE.CUSTOMER,
  })
  role: ROLE;

  @Column('text')
  @Check(`
    signup_method != 'manual' OR password IS NOT NULL
  `)
  password: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  @Check(`
    (birth_date > '1900-01-01' AND birth_date <= CURRENT_DATE - INTERVAL '10 years')
  `)
  birth_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
