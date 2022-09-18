import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { Exclude } from 'class-transformer';

export enum UserRole {
  USER = 'user',
}

@Entity('users')
export class User {
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ default: false })
  verifyPhone: boolean;

  @Column()
  fullName: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;
}
