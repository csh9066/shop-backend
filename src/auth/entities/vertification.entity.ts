import { User } from '../../users/entities/user.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity()
export class Vertificiation {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  token: string;

  @OneToOne(() => User, { nullable: true })
  @JoinColumn()
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @BeforeInsert()
  createToken() {
    this.token = uuidV4();
  }
}
