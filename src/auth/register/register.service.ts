import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import RegisterEntity from 'database/entities/register.entity';
import RegisterModelDto from 'database/dto/register.model';

@Injectable()
export default class RegisterService {
  constructor(
    @InjectRepository(RegisterEntity)
      private member: Repository<RegisterEntity>,
  ) {}

  public async createUser(newMember: RegisterModelDto): Promise<void> {
    const newUser = new RegisterEntity();

    newUser.firstName = newMember.firstName;
    newUser.lastName = newMember.lastName;
    newUser.email = newMember.email;
    newUser.password = newMember.password;

    await this.member.save(newUser);
  }
}
