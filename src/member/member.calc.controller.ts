import {
  Controller,
  Body,
  Param,
  Request,
  Get,
  Post,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import DataStockModel from 'database/dto/data.stock.model';
import MemberProfitsService from './member.calc.service';

@Controller(':firstname:lastname')
export default class MemberProfitsController {
  constructor(public profitService: MemberProfitsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('yourprofite')
  async calcProfite(@Body() data: DataStockModel) {
    return await this.profitService.createNewData(data);
  }
}
