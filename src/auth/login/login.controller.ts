import {
  Controller,
  Request,
  Res,
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
  async login(@Request() req, @Res({ passthrough: true }) response): Promise<any> {
    const token = await this.loginService.login(req.user);
    const secretData = {
      token,
    };
    const result = await response.cookie('auth-cookie', secretData, { httpOnly: true });

    if (result) {
      response.status(200).json({
        data: [],
      });
    } else {
      response.status(400).json({
        error: {
          code: 400,
          msg: 'Bad Request',
          details: 'Data is not correct',
        },
      });
    }
  }
}
