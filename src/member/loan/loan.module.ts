import { Module } from '@nestjs/common';
import LoanController from './loan.controller';
import LoanService from './loan.service';
import StrategyAService from './strategy/strategyA.service';
import StrategyBService from './strategy/strategyB.service';

@Module({
  controllers: [LoanController],
  providers: [LoanService, StrategyAService, StrategyBService],
})
export default class LoanModule {}
