import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import RegisterEntity from 'database/entities/register.entity';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from 'src/auth/strategy/local.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([RegisterEntity]),
    PassportModule,
  ],
  controllers: [LoginController],
  providers: [LoginService, LocalStrategy]
})
export class LoginModule {}
