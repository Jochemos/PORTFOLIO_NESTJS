import {
  Controller,
  Body,
  Post,
  UsePipes,
} from '@nestjs/common';
import RegisterModelDto from 'database/dto/register.model';
import RegisterValidatorPipe from './validation/validation.pipe';
import registerSchema from './validation/validation.schema';
import RegisterService from './register.service';

@Controller('register')
export default class RegisterController {
  constructor(private registerService: RegisterService) {}

  @Post()
  @UsePipes(new RegisterValidatorPipe(registerSchema))
  async userRegistration(@Body() registerModelDto: RegisterModelDto) {
    await this.registerService.createUser(registerModelDto);
  }
}
