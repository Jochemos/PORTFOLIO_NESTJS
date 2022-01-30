import { Injectable } from '@nestjs/common';
import StrategyModel from 'database/dto/strategy.loan.model';
import LoanModel from 'database/dto/loan.model';
import AnswerModel from 'database/dto/loan.answer.model';

@Injectable()
export default class StrategyAService implements StrategyModel {
  private readonly loanData: LoanModel[] = [];

  public doCalc(data: LoanModel): AnswerModel {
    this.loanData.push(data);
    const contentLoan = this.loanData[0];
    const valuesLoan = [];

    Object.values(contentLoan).map((val) => {
      const textView = `${parseFloat(val)}`;
      return valuesLoan.push(textView);
    });

    // Value assignment for calculation
    const aoc = Number(valuesLoan[0]);
    const rp = Number(valuesLoan[1]);
    const ni = Number(valuesLoan[2]) / 100;

    // Amount of installment (details)
    const up = aoc * ni;
    const inside = 12 / (12 + ni);
    const outside = inside ** rp;
    const down = (12 * (1 - outside));

    // Amount of installment (base)
    const partOfSum = up / down;

    // Total cost of the loan
    const totalSum = parseFloat(partOfSum.toFixed(2)) * rp;

    const answer = {
      totalCostOfLoan: totalSum,
      amountOfInstallment: parseFloat(partOfSum.toFixed(2)),
    };

    return answer;
  }
}
