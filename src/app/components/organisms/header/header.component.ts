import { Component, OnInit } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { CompanyContainerComponent } from '../../molecules/company-container/company-container.component';
import { CurrentRateComponent } from '../../molecules/current-rate/current-rate.component';
import { FetchRatesService } from '../../../services/ExchangeService/fetch-rates.service';
import { IRatePair } from '../../../types/RatePair';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgOptimizedImage, CompanyContainerComponent, CurrentRateComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  ratesArr: IRatePair[] = [];

  ngOnInit() {
    this.updateRates(['USD', 'EUR']);
  }

  constructor(private exchangeService: FetchRatesService) {}

  updateRates(currencies: string[]) {
    currencies.forEach((currency) => {
      this.exchangeService.getCurrencyRate(currency).subscribe((res) => {
        this.ratesArr.push({
          key: currency,
          value: res.conversion_rates['UAH'],
        });
      });
    });
  }
}
