import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UsersEntity } from '../../users';

@Entity({
  name: 'refreshTokens',
})
export class RefreshTokensEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('timestamp')
  expiresAt: Date;

  @Column('uuid')
  userId: string;

  @ManyToOne(() => UsersEntity, {
    cascade: true,
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'userId' })
  user: UsersEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
