import {
  Controller,
  Body,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import DataStockModel from 'database/dto/data.stock.model';
import MemberProfitsService from './member.calc.service';

@Controller(':firstname:lastname')
export default class MemberProfitsController {
  constructor(private profitService: MemberProfitsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('yourprofite')
  async calcProfite(@Body() data: DataStockModel): Promise<object> {
    const newData = await this.profitService.createNewData(data);
    return newData;
  }
}
