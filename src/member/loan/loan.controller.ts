import {
  Controller,
  Body,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import LoanModel from 'database/dto/loan.model';
import AnswerModel from 'database/dto/loan.answer.model';
import LoanService from './loan.service';

@Controller(':firstname:lastname')
export default class LoanController {
  constructor(public loanService: LoanService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('repayment')
  async calcLoan(@Body() data: LoanModel): Promise<AnswerModel> {
    const calcData = await this.loanService.createNewLoan(data);
    return calcData;
  }
}
