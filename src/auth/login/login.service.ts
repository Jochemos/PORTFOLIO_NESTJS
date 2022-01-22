import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import RegisterEntity from 'database/entities/register.entity';
import PresentUser from 'database/dto/login.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export default class LoginService {
  constructor(
    @InjectRepository(RegisterEntity)
      private member: Repository<RegisterEntity>,
      private jwtService: JwtService,
  ) {}

  async findOne(email: string): Promise<any> {
    return this.member.find({email: email});
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.findOne(email);
    if(user && user.password === pass) {
      //const { password, ...result } = user;
      //return result;
      return user;
    }
    return null;
  }

  async login(email: string, password: string){
    const payload = { email: user.email, pass: user.password };
    return{
      access_token: this.jwtService.sign(payload)
    }
  }
}
