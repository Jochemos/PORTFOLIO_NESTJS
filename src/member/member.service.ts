import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import RegisterEntity from 'database/entities/register.entity';

@Injectable()
export default class MemberService {
  constructor(
    @InjectRepository(RegisterEntity)
      private member: Repository<RegisterEntity>,
  ) {}

  public async getProfile(firstname: string, lastname: string): Promise<object> {
    const dataUser = await this.member.find({ firstName: firstname, lastName: lastname });
    return dataUser;
  }
}
