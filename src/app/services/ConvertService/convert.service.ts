import { Injectable } from '@angular/core';
import { CurrencyAmountsState } from '../CurrencyAmountsStateService/currency-amounts-state.service';
import { ActualRatesService } from '../ActualRatesService/actual-rates.service';
import { ICurrencyRatePair } from '../ActualRatesService/currency-rate-pair.types';

@Injectable({
  providedIn: 'root',
})
export class ConvertService {
  rates: ICurrencyRatePair[] = [];
  convertAmount2(amount1: number, currency1: string) {
    let inDollars = 0;
    let result = 0;

    this.rates.forEach((pair) => {
      if (pair.currency === currency1) {
        inDollars = (1 / pair.rate) * amount1;
      }
    });

    let amounts = this.currencyAmountsState.getState();
    this.rates.forEach((rate) => {
      if (rate.currency === amounts.currency_2) {
        result = inDollars * rate.rate;
      }
    });

    this.currencyAmountsState.setAmount('amount_2', result);
  }
  convertAmount1(amount2: number, currency2: string) {
    let inDollars = 0;
    let result = 0;

    this.rates.forEach((pair) => {
      if (pair.currency === currency2) {
        inDollars = (1 / pair.rate) * amount2;
      }
    });

    let amounts = this.currencyAmountsState.getState();
    this.rates.forEach((rate) => {
      if (rate.currency === amounts.currency_1) {
        result = inDollars * rate.rate;
      }
    });

    this.currencyAmountsState.setAmount('amount_1', result);
  }

  constructor(
    private currencyAmountsState: CurrencyAmountsState,
    private actualRates: ActualRatesService,
  ) {
    this.actualRates.getRatesState().subscribe((rates: ICurrencyRatePair[]) => {
      this.rates = rates;
    });
  }
}
