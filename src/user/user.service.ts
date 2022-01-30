import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CommentEntity from 'database/entities/user.entity';
import DataModel from 'database/dto/data.model';

@Injectable()
export default class UserService {
  constructor(
    @InjectRepository(CommentEntity)
      private user: Repository<CommentEntity>,
  ) {}

  public async execute(): Promise<CommentEntity[]> {
    const foundOne = await this.user.find();
    return foundOne;
  }

  public async createComment(comment: DataModel): Promise<void> {
    const newComment = new CommentEntity();
    newComment.author = comment.author;
    newComment.comment = comment.comment;

    await this.user.save(newComment);
  }
}
