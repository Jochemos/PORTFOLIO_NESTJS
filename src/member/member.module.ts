import { Module } from '@nestjs/common';
import LoginModule from 'src/auth/login/login.module';
import RegisterEntity from 'database/entities/register.entity';
import CommentEntity from 'database/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import MemberController from './member.controller';
import MemberActionsService from './member.comments.service';
import MemberService from './member.service';

@Module({
  imports: [LoginModule, TypeOrmModule.forFeature([RegisterEntity, CommentEntity])],
  controllers: [MemberController],
  exports: [LoginModule],
  providers: [MemberService, MemberActionsService],
})
export default class MemberModule {}
