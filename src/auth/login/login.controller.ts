import {
  Controller,
  Body,
  Req,
  Res,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { LoginService } from './login.service';
import { AuthGuard } from '@nestjs/passport';


@Controller('login')
export class LoginController {
  constructor(private loginService: LoginService) {}

  @UseGuards(AuthGuard('local'))
  @Post()
    async login(@Req() req, @Res({ passthrough: true }) res: Response){
      await this.loginService.login(req.user);
      return {"status": "success"};
    }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
    getProfile(@Req() req) {
      return req.user;
    }
}
