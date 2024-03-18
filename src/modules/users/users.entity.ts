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
export class UsersEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 20,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    length: 20,
  })
  lastName: string;

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
  phoneNo: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  profileUrl: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  profileKey: string;

  @Column({
    type: 'enum',
    enum: SIGNUP_METHOD,
    default: SIGNUP_METHOD.MANUAL,
  })
  signupMethod: SIGNUP_METHOD;

  @Column({
    type: 'enum',
    enum: ROLE,
    default: ROLE.CUSTOMER,
  })
  role: ROLE;

  @Column('text')
  @Check(`
    signupMethod != 'manual' OR password IS NOT NULL
  `)
  password: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  @Check(`
    (birthDate > '1900-01-01' AND birthDate <= CURRENT_DATE - INTERVAL '10 years')
  `)
  birthDate: Date;

  @Column({
    type: 'bool',
    default: false,
  })
  isActivated: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
