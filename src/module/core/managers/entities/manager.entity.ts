import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { TableName } from 'database/database.config';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

export enum MangerRole {
  ADMIN = 'admin',
}

@Entity(TableName.MANAGER)
export class Manager {
  constructor(partial: Partial<Manager>) {
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
