import { Module } from '@nestjs/common';
import LoginModule from 'src/auth/login/login.module';
import RegisterEntity from 'database/entities/register.entity';
import CommentEntity from 'database/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoanModule } from './loan/loan.module';
import MemberController from './member.controller';
import MemberProfitsController from './member.calc.controller';
import MemberService from './member.service';
import MemberActionsService from './member.comments.service';
import MemberProfitsService from './member.calc.service';

@Module({
  imports: [LoginModule, TypeOrmModule.forFeature([RegisterEntity, CommentEntity]), LoanModule],
  controllers: [MemberController, MemberProfitsController],
  exports: [LoginModule],
  providers: [MemberService, MemberActionsService, MemberProfitsService],
})
export default class MemberModule {}
