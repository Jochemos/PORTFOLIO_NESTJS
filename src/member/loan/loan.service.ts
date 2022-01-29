import { Injectable } from '@nestjs/common';
import LoanModel from 'database/dto/loan.model';
import StrategyAService from './strategy/strategyA.service';
import StrategyBService from './strategy/strategyB.service';
import AnswerModel from 'database/dto/loan.answer.model';

@Injectable()
export default class LoanService {

  private readonly strategyA: StrategyAService;
  private readonly strategyB: StrategyBService;

  constructor(
    private strategyA: StrategyAService,
    private strategyB: StrategyBService
  ){
    this.strategyA = strategyA;
    this.strategyB = strategyB;
  }

  public createNewLoan(data: LoanModel): AnswerModel {

    if(data./*..*/ > 0){
      const result = this.strategyB.doCalc(data: LoanModel);
      return result;
    }else{
      const result = this.strategyA.doCalc(data: LoanModel);
      return result;
    }
  }
}
