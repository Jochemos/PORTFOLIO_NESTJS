import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import RegisterEntity from 'database/entities/register.entity';

@Injectable()
export default class MemberService {
  constructor(
    @InjectRepository(RegisterEntity)
      private member: Repository<RegisterEntity>,
  ) {}

//  async getProfile(id: string): Promise<any> {
//      throw new NotFoundException('member not found');
//    }
//  }
}
