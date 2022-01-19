import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import RegisterEntity from 'database/entities/register.entity';
import { PresentUser } from 'database/dto/login.model';
import { RegisterService } from '../register/register.service';


@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(RegisterEntity)
      private member: Repository<RegisterEntity>,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.member.findOne({email: email});

    if(user === null && password === null){
      return null;
    }

    let presentUser = new PresentUser();
    presentUser.email = user.email;
    presentUser.firstName = user.firstName;
    presentUser.lastName = user.lastName;
    presentUser.userId = user.userId;

    return presentUser;

  }

}
