import { IsInt, Min, Max } from 'class-validator';

export default class LoanModel {
  @Min(500, {
    message: 'Amount of credit must be greater than $500',
  })
  @Max(250000, {
    message: 'Amount of credit must be less than $250000',
  })
    amountOfCredit: number;

  @IsInt({ message: 'Enter the number of months' })
  @Min(3, {
    message: 'The number of months cannot be less than 3',
  })
  @Max(120, {
    message: 'The number of months cannot be greater than 120',
  })
    repaymentPeriod: number;

  @Min(0.01, {
    message: 'Value of nominal interest must be greater than 0.01%',
  })
  @Max(20, {
    message: 'Value of nominal interest must be less than 20%',
  })
    nominalInterest: number;

  @Min(0)
  @Max(20, {
    message: 'The commission cannot be greater than 20%',
  })
    commission?: number;
}
