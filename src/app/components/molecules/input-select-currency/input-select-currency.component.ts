import { Component } from '@angular/core';
import { CurrencyInputComponent } from '../../atoms/currency-input/currency-input.component';
import { SelectOptionComponent } from '../../atoms/select-option/select-option.component';
import { CurrencySelectComponent } from '../currency-select/currency-select.component';

@Component({
  selector: 'app-input-select-currency',
  standalone: true,
  imports: [
    CurrencyInputComponent,
    SelectOptionComponent,
    CurrencySelectComponent,
  ],
  templateUrl: './input-select-currency.component.html',
  styleUrl: './input-select-currency.component.scss',
})
export class InputSelectCurrencyComponent {}
