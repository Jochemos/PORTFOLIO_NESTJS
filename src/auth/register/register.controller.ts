import {
  Controller,
  Body,
  Post,
  Res,
  UsePipes,
} from '@nestjs/common';
import { Response } from 'express';
import RegisterModelDto from 'database/dto/register.model';
import RegisterValidatorPipe from './validation/validation.pipe';
import registerSchema from './validation/validation.schema';
import RegisterService from './register.service';

@Controller('anonymous')
export default class RegisterController {
  constructor(private registerService: RegisterService) {}

  @Post('register')
  @UsePipes(new RegisterValidatorPipe(registerSchema))
  async userRegistration(
    @Body() registerModelDto: RegisterModelDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<any> {
    await this.registerService.createUser(registerModelDto);
    if (registerModelDto) {
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
