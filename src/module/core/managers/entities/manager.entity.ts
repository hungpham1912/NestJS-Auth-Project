import { Exclude } from 'class-transformer';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

export enum MangerRole {
  ADMIN = 'admin',
}

@Entity('managers')
export class Manager {
  constructor(partial: Partial<Manager>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  fullName: string;

  @Column({ type: 'enum', enum: MangerRole, default: MangerRole.ADMIN })
  role: string;

  @Index({ unique: true })
  @Column({ nullable: true, unique: true })
  phone: string;

  @Index({ unique: true })
  @Column({ nullable: true, unique: true })
  email: string;
}
