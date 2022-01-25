import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import RegisterEntity from 'database/entities/register.entity';
import { PassportModule } from '@nestjs/passport';
import LocalStrategy from 'src/auth/strategy/local.service';
import JwtStrategy from 'src/auth/strategy/jwt.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import LoginService from './login.service';
import LoginController from './login.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['database/.secrets.vault.env'],
    }),
    TypeOrmModule.forFeature([RegisterEntity]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '5h' },
    }),
  ],
  controllers: [LoginController],
  providers: [LoginService, LocalStrategy, JwtStrategy],
})
export default class LoginModule {}
