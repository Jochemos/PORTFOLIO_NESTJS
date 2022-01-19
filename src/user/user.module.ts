import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserService from 'src/user/user.service';
import UserController from 'src/user/user.controller';
import CommentEntity from 'database/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentEntity]),
  ],
  providers: [UserService],
  controllers: [UserController],
})

export default class UserModule {}
