import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/organisms/header/header.component';
import { DashboardComponent } from '../../components/organisms/dashboard/dashboard.component';
import { FetchRatesService } from '../../services/ExchangeService/fetch-rates.service';
import { ICurrencyRatePair } from '../../services/ActualRatesService/currency-rate-pair.types';
import { ActualRatesService } from '../../services/ActualRatesService/actual-rates.service';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [HeaderComponent, DashboardComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
})
export class MainPageComponent implements OnInit {
  ngOnInit() {
    this.exchangeService.getCurrencyRate('USD').subscribe((res) => {
      const rates: ICurrencyRatePair[] = [];
      for (const key in res.conversion_rates) {
        if (res.conversion_rates.hasOwnProperty(key)) {
          rates.push({
            currency: key,
            rate: res.conversion_rates[key],
          });
        }
      }
      this.actualRatesService.setRatesState(rates);
    });
  }

  constructor(
    private exchangeService: FetchRatesService,
    private actualRatesService: ActualRatesService,
  ) {}
}
