import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '@app/user/user.entity';

@Entity('Post')
export class PostEntity {
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
    type: 'text',
  })
  text: string;

  @Column()
  readonly userId: string;

  @ManyToOne(() => UserEntity, (user) => user.posts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: UserEntity;
}
