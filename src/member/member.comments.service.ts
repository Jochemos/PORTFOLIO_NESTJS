import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CommentEntity from 'database/entities/user.entity';
import DataModel from 'database/dto/data.model';

@Injectable()
export default class MemberActionsService {
  constructor(
    @InjectRepository(CommentEntity)
      private comments: Repository<CommentEntity>,
  ) {}

  public async execute(): Promise<CommentEntity[]> {
    const findThis = await this.comments.find();
    return findThis;
  }

  public async createComment(comment: DataModel, name: string): Promise<void> {
    const newComment = new CommentEntity();
    newComment.author = name;
    newComment.comment = comment.comment;
    newComment.created_At = comment.created_At;
    await this.comments.save(newComment);
  }
}
