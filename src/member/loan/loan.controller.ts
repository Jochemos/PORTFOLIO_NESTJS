import {
  Controller,
  Body,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import LoanModel from 'database/dto/loan.model';
import AnswerModel from 'database/dto/loan.answer.model';
import LoanService from './loan.service';

@Controller(':firstname:lastname')
export default class LoanController {
  constructor(public loanService: LoanService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('repayment')
  async calcLoan(
    @Body() dataStore: LoanModel,
    @Res({ passthrough: true }) response: Response,
  ): Promise<any> {
    const calcData = await this.loanService.createNewLoan(dataStore);
    if (calcData as AnswerModel) {
      response.status(200).json({
        data: [calcData],
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
