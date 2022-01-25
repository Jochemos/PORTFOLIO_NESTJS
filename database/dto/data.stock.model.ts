import { IsInt, Min, Max } from 'class-validator';

export default class DataStockModel {
  @Min(1, {
    message: 'Enter number at least one stock',
  })
  @Max(999, {
    message: 'Enter less stocks (max. 999)',
  })
    numberOfStock: number;

  @Min(0.01, {
    message: 'Enter purchase at least 0.01 dolar',
  })
  @Max(1000000, {
    message: 'Sorry... you must enter max. 1 milion dolar',
  })
    purchasePrice: number;

  @Min(0.01, {
    message: 'Enter your profit or loss at least 0.01 dolar',
  })
  @Max(10000000, {
    message: 'Enter less profit (max. 10 milion)',
  })
    salePrice: number;

  @IsInt({ message: 'brokerage commission must be a number and cannot be a decimal point number' })
  @Max(99, {
    message: 'Enter brokerage commission as max. 99%',
  })
    brokerageCommission: number;
}
