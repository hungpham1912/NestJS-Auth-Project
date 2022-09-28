import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export enum UserRole {
  USER = 'user',
}

@Entity('users')
export class User {
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  @ApiProperty({
    example: 'af4798d8-2743-4f51-8e83-e75763f69bcc',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Exclude()
  @Column()
  password: string;

  @ApiProperty({
    example: true,
  })
  @Column({ default: false })
  verifyPhone: boolean;

  @ApiProperty({
    example: 'Hung',
  })
  @Column()
  fullName: string;

  @ApiProperty({
    example: 'user',
  })
  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: string;

  @ApiProperty({
    example: '0964816205',
  })
  @Column({ nullable: true })
  phone: string;

  @ApiProperty({
    example: 'demo@gmail.com',
  })
  @Column({ nullable: true })
  email: string;
}
