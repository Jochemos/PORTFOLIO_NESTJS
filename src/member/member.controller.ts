import {
  Controller,
  Body,
  Param,
  Request,
  Get,
  Post,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import MemberDataModel from 'database/dto/member.data.model';
import MemberService from './member.service';
import MemberActionsService from './member.comments.service';

@Controller(':firstname:lastname')
export default class MemberController {
  constructor(private memberService: MemberService, public actionsService: MemberActionsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(@Param('firstname') firstname, @Param('lastname') lastname, @Request() req) {
    const profile = await this.memberService.getProfile(firstname, lastname);
    const { user } = req;
    if (profile[0].firstName === user.firstName && profile[0].lastName === user.lastName) {
      const {
        userId, iat, exp, ...result
      } = user;
      return result;
    }
    throw new NotFoundException('Profile not found.');
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('allcomments')
  async getAll() {
    return await this.actionsService.execute();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('addcomment')
  async addComment(@Body() comment: MemberDataModel, @Request() req) {
    const name = req.user.firstName;
    await this.actionsService.createComment(comment, name);
    return { status: 'Thank you for comment' };
  }
}
