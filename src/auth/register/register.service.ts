import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import RegisterEntity from 'database/entities/register.entity';
import RegisterModelDto from 'database/dto/register.model';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(RegisterEntity)
      private member: Repository<RegisterEntity>,
  ) {}

  public async createUser(newMember: RegisterModelDto): Promise<void> {
    const repo = getRepository(RegisterEntity);
    const result = repo.create(newMember);
    await this.member.insert(result);
  }

}
