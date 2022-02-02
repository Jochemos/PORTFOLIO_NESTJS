import {
  Controller,
  Body,
  Get,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import DataModel from 'database/dto/data.model';
import UserService from './user.service';

@Controller('anonymous')
export default class UserController {
  constructor(private baseService: UserService) {}

  @Get('allcomments')
  async getAll(@Res({ passthrough: true }) response: Response): Promise<any> {
    const executeView = await this.baseService.execute();
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

  @Post('addcomment')
  async save(
    @Body() comment: DataModel,
    @Res({ passthrough: true }) response: Response,
  ): Promise<any> {
    await this.baseService.createComment(comment);
    if (comment) {
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
