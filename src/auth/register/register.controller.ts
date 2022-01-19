import {
  Controller,
  Body,
  Get,
  Post,
  UsePipes,
} from '@nestjs/common';
import RegisterModelDto from 'database/dto/register.model';
import { RegisterService } from './register.service';
import RegisterValidatorPipe from 'src/auth/register/validation/validation.pipe';
import { registerSchema } from 'src/auth/register/validation/validation.schema';

@Controller('register')
export class RegisterController {
  constructor(private registerService: RegisterService) {}

  @Post()
  @UsePipes(new RegisterValidatorPipe(registerSchema))
    async userRegistration(@Body() registerModelDto: RegisterModelDto){
      await this.registerService.createUser(registerModelDto);
    }
}
