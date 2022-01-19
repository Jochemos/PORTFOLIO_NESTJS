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

  @Post()
  @UseGuards(AuthGuard('local'))
    async login(@Req() req, @Res({ passthrough: true }) res: Response){
      return {"status": "success"};
    }
}
