import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import RegisterEntity from 'database/entities/register.entity';
import { PresentUser } from 'database/dto/login.model';
import { RegisterService } from '../register/register.service';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(RegisterEntity)
      private member: Repository<RegisterEntity>,
      private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<PresentUser> {
    const user = await this.member.findOne({email: email});

    if(user === null || password === null){
      return null;
    }

    let presentUser = new PresentUser();
    presentUser.userId = user.userId;
    presentUser.firstName = user.firstName;
    presentUser.lastName = user.lastName;
    presentUser.email = user.email;

    return presentUser;

  }

  public async login(presentUser: PresentUser): Promise<string> {
    const payLoad = { ...presentUser }
    return await this.jwtService.signAsync(payLoad);
  }
}
