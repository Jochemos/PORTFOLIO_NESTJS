import { Injectable } from '@nestjs/common';
import DataStockModel from 'database/dto/data.stock.model';

@Injectable()
export default class MemberProfitsService {
  private readonly StockData: DataStockModel[] = [];

  public async createNewData(data: DataStockModel) {
    this.StockData.push(data);
    const tabloView = this.StockData[0];
    const values = [];

    Object.values(tabloView).map((val) => {
      const txtData = `${parseFloat(val)}`;
      return values.push(txtData);
    });

    const nof = Number(values[0]);
    const pp = Number(values[1]);
    const sp = Number(values[2]);
    const bc = Number(values[3]);
    const purchase = ((pp * nof) * bc) / 100;
    const sale = ((sp * nof) * bc) / 100;
    const commissions = (purchase + sale);
    const vas = nof * sp;
    const gpbc = (sp * nof) - (pp * nof);
    const pac = gpbc - commissions;
    const cgt = pac * 0.19;
    const np = pac - cgt;
    const roc = (np / vas) * 100;

    const answer = {
      'CAPITAL TO BE INVESTED': (pp * nof).toFixed(2),
      'COMMISSIONS ( PURCHASE + SALE )': `${commissions.toFixed(2)} = ${purchase.toFixed(2)} + ${sale.toFixed(2)}`,
      'VALUE AFTER SALE': vas.toFixed(2),
      'GROSS PROFIT BEFORE COMMISSIONS': gpbc.toFixed(2),
      'PROFIT AFTER COMMISSIONS': pac.toFixed(2),
      'CAPITAL GAINS TAX (19%)': cgt.toFixed(2),
      'NET PROFIT': np.toFixed(2),
      'RETURN FROM CAPITAL (RoC)': `${roc.toFixed(2)}%`,
    };
    return answer;
  }
}
