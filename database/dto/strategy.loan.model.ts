import LoanModel from './loan.model';
import AnswerModel from 'database/dto/loan.answer.model';

export default class StrategyModel {
  doCalc(data: LoanModel): AnswerModel;
}
