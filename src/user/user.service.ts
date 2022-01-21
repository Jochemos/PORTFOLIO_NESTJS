import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import CommentEntity from 'database/entities/user.entity';
import DataModel from 'database/dto/data.model';

@Injectable()
export default class UserService {
  constructor(
    @InjectRepository(CommentEntity)
      private user: Repository<CommentEntity>,
  ) {}

  public async execute(): Promise<CommentEntity[]> {
    return await this.user.find();
  }

  public async createComment(comment: DataModel): Promise<void> {
    const repo = getRepository(CommentEntity);
    const result = repo.create(comment);
    await this.user.insert(result);
  }
}
