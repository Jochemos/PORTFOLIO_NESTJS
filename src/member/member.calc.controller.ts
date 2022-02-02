import {
  Controller,
  Body,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import DataStockModel from 'database/dto/data.stock.model';
import MemberProfitsService from './member.calc.service';

@Controller(':firstname.:lastname')
export default class MemberProfitsController {
  constructor(private profitService: MemberProfitsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('yourprofite')
  async calcProfite(
    @Body() dataStore: DataStockModel,
    @Res({ passthrough: true }) response: Response,
  ): Promise<any> {
    const newData = await this.profitService.createNewData(dataStore);
    if (newData) {
      response.status(200).json({
        data: [newData],
      });
    } else {
      response.status(400).json({
        error: {
          code: 400,
          msg: 'Bad Request',
          details: 'Data is not correct',
        },
      });
    }
  }
}
