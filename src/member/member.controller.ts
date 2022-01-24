import {
  Controller,
  Body,
  Param,
  Request,
  Res,
  Get,
  Post,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import MemberService from './member.service';
import UserService from 'src/user/user.service';
import DataModel from 'database/dto/data.model';

@Controller(':firstname.:lastname')
export default class MemberController {
  constructor(private memberService: MemberService, public baseService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(@Param('firstname') firstname, @Param('lastname') lastname, @Request() req) {
    const profile = await this.memberService.getProfile(firstname, lastname);
    const user = req.user
    if (profile[0].firstName === user.firstName && profile[0].lastName === user.lastName) {
      const { userId, iat, exp, ...result } = user;
      return result;
    }else{
      throw new NotFoundException('Profile not found.');
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('allcomments')
  async getAll() {
    return await this.baseService.execute();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('addcomment')
  async save(@Body() comment: DataModel) {
    await this.baseService.createComment(comment);
  }

}
