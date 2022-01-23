import { Module } from '@nestjs/common';
import MemberService from './member.service';
import MemberController from './member.controller';
import LoginModule from 'src/auth/login/login.module';
import RegisterEntity from 'database/entities/register.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [LoginModule, TypeOrmModule.forFeature([RegisterEntity]),],
  controllers: [MemberController],
  exports: [LoginModule],
  providers: [MemberService]
})
export default class MemberModule {}
