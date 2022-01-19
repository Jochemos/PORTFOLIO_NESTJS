import { Module } from '@nestjs/common';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import RegisterEntity from 'database/entities/register.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RegisterEntity]),
  ],
  controllers: [RegisterController],
  providers: [RegisterService]
})
export class RegisterModule {}
