import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PostEntity } from '@app/post/post.entity';

@Entity('User')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    type: 'timestamptz',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    nullable: true,
    default: null,
  })
  updatedAt: Date;

  @DeleteDateColumn({
    type: 'timestamptz',
    nullable: true,
  })
  deletedAt: Date;

  /*========================================================================*/

  @Column({
    type: 'varchar',
    length: 128,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 128,
  })
  name: string;

  @OneToMany(() => PostEntity, (post) => post.user, { cascade: true })
  posts: PostEntity[];
}
