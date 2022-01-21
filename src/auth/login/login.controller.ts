import {
  Controller,
  Req,
  Res,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import LoginService from './login.service';

@Controller('login')
export default class LoginController {
  constructor(private loginService: LoginService) {}

  @UseGuards(AuthGuard('local'))
  @Post()
  async login(@Req() req, @Res({ passthrough: true }) res: Response) {
    await this.loginService.login(req.user);
    return { status: 'success' };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(@Req() req) {
    return await req.user;
  }
}
