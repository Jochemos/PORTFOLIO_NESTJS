import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import LoginModule from 'src/auth/login/login.module';
import UserModule from 'src/user/user.module';
import CommentEntity from 'database/entities/user.entity';
import RegisterEntity from 'database/entities/register.entity';
import RegisterModule from 'src/auth/register/register.module';
import MemberModule from 'src/member/member.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['database/.config.env', '.base.env'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
      database: process.env.DATABASE_NAME,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      logging: false,
      entities: [
        CommentEntity,
        RegisterEntity,
      ],
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    MemberModule,
    LoginModule,
    RegisterModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export default class AppModule {}
