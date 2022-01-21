import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import CommentEntity from 'database/entities/user.entity';
import UserService from './user.service';
import UserController from './user.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentEntity]),
  ],
  providers: [UserService],
  controllers: [UserController],
})

export default class UserModule {}
