import { Module } from '@nestjs/common';
import { MemberController } from './member.controller';

@Module({
  controllers: [MemberController]
})
export class MemberModule {}
