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

  async validateUser(email: string, password: string): Promise<PresentUser> {
    const user = await this.member.findOne({ email });

    if (user === null || password === null) {
      return null;
    }

    const presentUser = new PresentUser();
    presentUser.userId = user.userId;
    presentUser.firstName = user.firstName;
    presentUser.lastName = user.lastName;
    presentUser.email = user.email;

    return presentUser;
  }

  public async login(presentUser: PresentUser): Promise<string> {
    const payLoad = { ...presentUser };
    return await this.jwtService.signAsync(payLoad);
  }
}
