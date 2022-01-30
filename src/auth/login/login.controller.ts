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

@Controller('anonymous')
export default class LoginController {
  constructor(private loginService: LoginService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req, @Res({ passthrough: true }) res): Promise<object> {
    const token = await this.loginService.login(req.user);
    const secretData = {
      token,
    };
    res.cookie('auth-cookie', secretData, { httpOnly: true });
    return { status: 'success' };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(@Request() req): Promise<object> {
    const profileView = await req.user;
    return profileView;
  }
}
