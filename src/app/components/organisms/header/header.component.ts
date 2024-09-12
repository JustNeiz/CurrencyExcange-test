import { Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { CompanyContainerComponent } from '../../molecules/company-container/company-container.component';
import { CurrentRateComponent } from '../../molecules/current-rate/current-rate.component';
import { ExchangeService } from '../../../services/ExchangeService/exchange.service';
import { log } from '@angular-devkit/build-angular/src/builders/ssr-dev-server';
import { IRatePair } from '../../../types/RatePair';
import { ICurrencyFlag } from '../../../types/ICurrencyFlag';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgOptimizedImage, CompanyContainerComponent, CurrentRateComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  ratesArr: IRatePair[] = [];

  constructor(private exchangeService: ExchangeService) {
    this.updateRates(['USD', 'EUR']);
  }

  updateRates(currencies: string[]) {
    currencies.forEach((currency) => {
      this.exchangeService.getCurrencyRate(currency).subscribe((res) => {
        this.ratesArr.push({
          key: currency,
          value: res.conversion_rates['UAH'],
        });
        console.log('header' + this.ratesArr);
      });
    });
  }
}
