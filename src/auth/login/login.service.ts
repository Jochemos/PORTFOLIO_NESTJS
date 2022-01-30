import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import RegisterEntity from 'database/entities/register.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export default class LoginService {
  constructor(
    @InjectRepository(RegisterEntity)
      private member: Repository<RegisterEntity>,
      private jwtService: JwtService,
  ) {}

  public async validateUser(email: string, password: string): Promise<object> {
    const user = await this.member.findOne({ email });
    return user;
  }

  public async login(user): Promise<string> {
    const payload = await { ...user };
    return this.jwtService.sign(payload);
  }
}
