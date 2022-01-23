import {
  Controller,
  Param,
  Request,
  Res,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import MemberService from './member.service';

@Controller()
export default class MemberController {
  constructor(private memberService: MemberService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('profile/:id')
  async getProfile(@Param() reqParam, @Request() req) {
    //await this.memberService.getProfile(reqParam.id);
    return req.user;
  }
}
