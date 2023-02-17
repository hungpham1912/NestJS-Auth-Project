import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity, Index } from 'typeorm';

export enum MangerRole {
  ADMIN = 'admin',
  OPERATOR = 'operator',
}

@Entity('managers')
export class Manager extends BaseEntity {
  @Exclude()
  @Column()
  password: string;

  @ApiProperty({
    example: 'Hung',
  })
  @Column()
  fullName: string;

  @ApiProperty({
    example: 'admin',
  })
  @Column({ type: 'enum', enum: MangerRole, default: MangerRole.ADMIN })
  role: string;

  @ApiProperty({
    example: '0964816205',
  })
  @Index({ unique: true })
  @Column({ nullable: true, unique: true })
  phone: string;

  @ApiProperty({
    example: 'demo@gmail.com',
  })
  @Index({ unique: true })
  @Column({ nullable: true, unique: true })
  email: string;
}
