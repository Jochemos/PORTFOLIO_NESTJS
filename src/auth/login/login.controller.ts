import {
  Controller,
  Request,
  Res,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import LoginService from './login.service';

@Controller()
export default class LoginController {
  constructor(private loginService: LoginService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req, @Res({ passthrough: true }) res) {
    await this.loginService.login(req.user);
    return {"status": "success"};
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }
}
