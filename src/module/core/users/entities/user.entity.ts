import { Column, Entity } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/shared/entities/base.entity';

export enum UserRole {
  USER = 'user',
}

@Entity('users')
export class User extends BaseEntity {
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
