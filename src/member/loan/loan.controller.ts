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
import LoanModel from 'database/dto/loan.model';
import LoanService from './loan.service';
import AnswerModel from 'database/dto/loan.answer.model';

@Controller()
export default class LoanController {
  constructor(public loanService: LoanService) {}

  //@UseGuards(AuthGuard('jwt'))
  @Post('repayment')
  async calcLoan(@Body() data: LoanModel): Promise<AnswerModel> {
    return await this.loanService.createNewLoan(data);
  }
}
