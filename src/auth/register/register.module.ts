import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import RegisterEntity from 'database/entities/register.entity';
import RegisterController from './register.controller';
import RegisterService from './register.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RegisterEntity]),
  ],
  controllers: [RegisterController],
  providers: [RegisterService],
})
export default class RegisterModule {}
