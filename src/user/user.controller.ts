import {
  Controller,
  Body,
  Get,
  Post,
} from '@nestjs/common';
import DataModel from 'database/dto/data.model';
import UserService from './user.service';

@Controller('anonymous')
export default class UserController {
  constructor(private baseService: UserService) {}

  @Get('allcomments')
  async getAll(): Promise<object> {
    const executeView = await this.baseService.execute();
    return executeView;
  }

  @Post('addcomment')
  async save(@Body() comment: DataModel): Promise<object> {
    await this.baseService.createComment(comment);
    return { status: 'Thank you for comment' };
  }
}
