import { Module } from '@nestjs/common';
import MemberService from './member.service';
import UserService from 'src/user/user.service';
import MemberController from './member.controller';
import LoginModule from 'src/auth/login/login.module';
import RegisterEntity from 'database/entities/register.entity';
import CommentEntity from 'database/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [LoginModule, TypeOrmModule.forFeature([RegisterEntity, CommentEntity])],
  controllers: [MemberController],
  exports: [LoginModule],
  providers: [MemberService, UserService]
})
export default class MemberModule {}
