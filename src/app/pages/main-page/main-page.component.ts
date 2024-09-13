import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/organisms/header/header.component';
import { DashboardComponent } from '../../components/organisms/dashboard/dashboard.component';
import { CurrencyAmountsState } from '../../services/CurrencyAmountsStateService/currency-amounts-state.service';
import { ICurrencyAmountsStateTypes } from '../../services/CurrencyAmountsStateService/currency-amounts-state.types';
import { HttpClient } from '@angular/common/http';
import { ExchangeService } from '../../services/ExchangeService/exchange.service';
import { IRatePair } from '../../types/RatePair';
import { ICurrencyRatePair } from '../../services/ActualRatesService/currency-rate-pair.types';
import { ActualRatesService } from '../../services/ActualRatesService/actual-rates.service';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [HeaderComponent, DashboardComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
})
export class MainPageComponent {
  constructor(
    exchangeService: ExchangeService,
    actualRatesService: ActualRatesService,
  ) {
    exchangeService.getCurrencyRate('USD').subscribe((res) => {
      const rates: ICurrencyRatePair[] = [];
      for (const key in res.conversion_rates) {
        if (res.conversion_rates.hasOwnProperty(key)) {
          rates.push({
            currency: key,
            rate: res.conversion_rates[key],
          });
        }
      }
      actualRatesService.setRatesState(rates);
    });
  }
}
