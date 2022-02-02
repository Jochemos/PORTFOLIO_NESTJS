import {
  Controller,
  Body,
  Param,
  Req,
  Res,
  Get,
  Post,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import MemberDataModel from 'database/dto/member.data.model';
import MemberService from './member.service';
import MemberActionsService from './member.comments.service';

@Controller(':firstname.:lastname')
export default class MemberController {
  constructor(
    private memberService: MemberService,
    private actionsService: MemberActionsService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(
    @Param('firstname') firstname,
    @Param('lastname') lastname,
    @Req() req,
  ): Promise<object> {
    const profile = await this.memberService.getProfile(firstname, lastname);
    const { user } = req;
    if (profile[0].firstName === user.firstName && profile[0].lastName === user.lastName) {
      const {
        userId, iat, exp, ...resultView
      } = user;
      return { data: [resultView] };
    }
    throw new NotFoundException('Profile not found.');
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('allcomments')
  async getAll(@Res({ passthrough: true }) response: Response): Promise<any> {
    const executeView = await this.actionsService.execute();
    if (executeView) {
      response.status(200).json({
        data: [...executeView],
      });
    } else {
      response.status(404).json({
        error: {
          code: 404,
          msg: 'File not found',
          details: 'Comments is not exist',
        },
      });
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('addcomment')
  async addComment(
    @Body() comment: MemberDataModel,
    @Req() req,
    @Res({ passthrough: true }) response: Response,
  ): Promise<any> {
    const nameUser = req.user.firstName;
    await this.actionsService.createComment(comment, nameUser);
    if (comment && nameUser) {
      response.status(200).json({
        data: [],
      });
    } else {
      response.status(400).json({
        error: {
          code: 400,
          msg: 'Bad Request',
          details: 'Comment not add',
        },
      });
    }
  }
}
