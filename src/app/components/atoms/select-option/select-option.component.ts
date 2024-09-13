import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { currencyFlags } from '../../../constants/currencyFlags';
import { CurrencyAmountsState } from '../../../services/CurrencyAmountsStateService/currency-amounts-state.service';
import { Subscription } from 'rxjs';
import { CurrencyInputComponent } from '../currency-input/currency-input.component';
import { ConvertService } from '../../../services/ConvertService/convert.service';
import { ICurrencyAmountsStateTypes } from '../../../services/CurrencyAmountsStateService/currency-amounts-state.types';

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
  @Output() flagSelected = new EventEmitter<{ key: string; value: string }>();

  state!: ICurrencyAmountsStateTypes;
  onOptionClick() {
    this.flagSelected.emit(this.flag);
  }
}
