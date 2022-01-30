import { Injectable } from '@nestjs/common';
import LoanModel from 'database/dto/loan.model';
import AnswerModel from 'database/dto/loan.answer.model';
import StrategyAService from './strategy/strategyA.service';
import StrategyBService from './strategy/strategyB.service';

@Injectable()
export default class LoanService {
  constructor(
    private strategyA: StrategyAService,
    private strategyB: StrategyBService,
  ) {}

  public async createNewLoan(data: LoanModel): Promise<AnswerModel> {
    if (data.commission > 0) {
      const result = await this.strategyB.doCalc(data);
      return result;
    }
    const result = await this.strategyA.doCalc(data);
    return result;
  }
}
