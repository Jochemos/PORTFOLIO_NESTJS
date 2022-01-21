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
  async getAll() {
    return await this.baseService.execute();
  }

  @Post('addcomment')
  async save(@Body() comment: DataModel) {
    await this.baseService.createComment(comment);
  }
}
