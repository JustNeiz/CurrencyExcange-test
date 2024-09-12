import { Component, inject } from '@angular/core';
import { ExchangeService } from '../../../services/ExchangeService/exchange.service';
import { CurrencyExchangeTitleComponent } from '../../atoms/currency-exchange-title/currency-exchange-title.component';
import { InputSelectCurrencyComponent } from '../../molecules/input-select-currency/input-select-currency.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CurrencyExchangeTitleComponent, InputSelectCurrencyComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
