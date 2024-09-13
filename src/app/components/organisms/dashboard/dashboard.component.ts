import { Component, OnDestroy, OnInit } from '@angular/core';
import { CurrencyExchangeTitleComponent } from '../../atoms/currency-exchange-title/currency-exchange-title.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyInputComponent } from '../../atoms/currency-input/currency-input.component';
import { CustomAutocompleteComponent } from '../../molecules/custom-autocomplete/custom-autocomplete.component';
import { Subscription } from 'rxjs';
import { CurrencyAmountsState } from '../../../services/CurrencyAmountsStateService/currency-amounts-state.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CurrencyExchangeTitleComponent,
    ReactiveFormsModule,
    CurrencyInputComponent,
    FormsModule,
    CustomAutocompleteComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  amount_1!: number;
  amount_2!: number;
  currency_1!: string;
  currency_2!: string;

  ngOnInit(): void {
    this.subscription = this.stateService.state$.subscribe((state) => {
      this.amount_1 = state.amount_1;
      this.amount_2 = state.amount_2;
      this.currency_1 = state.currency_1;
      this.currency_2 = state.currency_2;
    });
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  constructor(private stateService: CurrencyAmountsState) {}
}
