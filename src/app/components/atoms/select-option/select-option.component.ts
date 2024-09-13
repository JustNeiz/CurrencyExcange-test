import { Component, Input, OnInit } from '@angular/core';
import { currencyFlags } from '../../../constants/currencyFlags';
import { CurrencyAmountsState } from '../../../services/CurrencyAmountsStateService/currency-amounts-state.service';
import { Subscription } from 'rxjs';
import { CurrencyInputComponent } from '../currency-input/currency-input.component';

@Component({
  selector: 'app-select-option',
  standalone: true,
  imports: [],
  templateUrl: './select-option.component.html',
  styleUrl: './select-option.component.scss',
})
export class SelectOptionComponent {
  @Input() flag!: { key: string; value: string };
  @Input() currencyKey!: 'currency_1' | 'currency_2';

  onOptionClick() {
    this.stateService.setCurrency(this.currencyKey, this.flag.key);
  }
  constructor(private stateService: CurrencyAmountsState) {}
  protected readonly currencyFlags = currencyFlags;
}
