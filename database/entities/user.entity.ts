import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'nest_comments' })
export default class CommentEntity {
  @PrimaryGeneratedColumn('increment', { name: 'commentid' })
    commentId: number;

  @Column({ name: 'author' })
    author: string;

  @Column({ name: 'comment', length: 500 })
    comment: string;

  @CreateDateColumn({ name: 'date', type: 'timestamp' })
    created_At: Date;
}
