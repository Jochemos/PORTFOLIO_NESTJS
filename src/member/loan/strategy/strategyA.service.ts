import { Injectable } from '@nestjs/common';
import StrategyModel from 'database/dto/strategy.loan.model';
import LoanModel from 'database/dto/loan.model';
import AnswerModel from 'database/dto/loan.answer.model';

@Injectable()
export default class StrategyAService implements StrategyModel {
  private readonly LoanData: LoanModel[] = [];

  public doCalc(data: LoanModel): AnswerModel {
    this.LoanData.push(data);
    const contentLoan = this.LoanData[0];
    const valuesLoan = [];
    for (const [key, value] of Object.entries(contentLoan)) {
      const text = `${parseFloat(value)}`;
      valuesLoan.push(text);
    }

//  Value assignment for calculation
    const aoc = Number(valuesLoan[0]);
    const rp = Number(valuesLoan[1]);
    const ni = Number(valuesLoan[2]) / 100;
    const co = Number(valuesLoan[3]);


//  Amount of installment (details)
    const up = aoc * ni;
    const inside = 1 - ( 12 / 12 + ni );
    const outside = Math.pow(inside, rp);
    const down = 12 * outside;

//  Interest rate (part of formula: Amount of installment)
//    const ir = ni / 12;

//  Amount of installment (base)
    const partOfSum = up / down;

// Total cost of the loan
    const totalSum = partOfSum * rp;

    const answer = {
      'TOTAL COST OF THE LOAN': totalSum,
      'AMOUNT OF INSTALLMENT': partOfSum,
    };

    return answer;
  }
}
