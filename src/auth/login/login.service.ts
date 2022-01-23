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

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.member.findOne({ email });
    return user;
  }

  async login(user) {
    const payload = { ...user };
    return this.jwtService.sign(payload);
  }
}
