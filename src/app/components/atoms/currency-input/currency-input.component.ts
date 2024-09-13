import { Component, Input } from '@angular/core';
import { CurrencyAmountsState } from '../../../services/CurrencyAmountsStateService/currency-amounts-state.service';
import { FormsModule } from '@angular/forms';
import { ConvertService } from '../../../services/ConvertService/convert.service';

@Component({
  selector: 'app-currency-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './currency-input.component.html',
  styleUrls: ['./currency-input.component.scss'],
})
export class CurrencyInputComponent {
  @Input() amountKey!: 'amount_1' | 'amount_2';
  @Input() amountValue!: number;

  constructor(
    private stateService: CurrencyAmountsState,
    private convertService: ConvertService,
  ) {}

  onInputChange(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    const parsedValue = parseFloat(inputValue);

    if (isNaN(parsedValue) || parsedValue < 0) {
      this.amountValue = 0;
    } else {
      this.amountValue = parsedValue;
    }

    this.stateService.setAmount(this.amountKey, this.amountValue);
    this.updateState();
  }

  updateState() {
    const state = this.stateService.getState();

    if (this.amountKey === 'amount_1') {
      this.convertService.convertAmount2(this.amountValue, state.currency_1);
    } else {
      this.convertService.convertAmount1(this.amountValue, state.currency_2);
    }
  }
}
