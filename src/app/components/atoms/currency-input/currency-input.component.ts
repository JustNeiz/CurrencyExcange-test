import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { CurrencyAmountsState } from '../../../services/CurrencyAmountsStateService/currency-amounts-state.service';
import { FormsModule } from '@angular/forms';
import { ConvertService } from '../../../services/ConvertService/convert.service';
import { ICurrencyAmountsStateTypes } from '../../../services/CurrencyAmountsStateService/currency-amounts-state.types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-currency-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './currency-input.component.html',
  styleUrls: ['./currency-input.component.scss'],
})
export class CurrencyInputComponent implements OnInit, OnDestroy {
  @Input() amountKey!: 'amount_1' | 'amount_2';
  @Input() amountValue!: number;
  currencyAmount!: number;
  private subscription!: Subscription;

  constructor(
    private stateService: CurrencyAmountsState,
    private convertService: ConvertService,
  ) {}

  ngOnInit(): void {
    this.subscription = this.stateService.state$.subscribe(() => {
      this.currencyAmount = this.amountValue;
    });
    console.log(this.amountValue);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onInputChange(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    if (inputValue) {
      this.currencyAmount = parseFloat(inputValue);
      this.stateService.setAmount(this.amountKey, this.currencyAmount);
      this.updateState();
    } else {
      this.stateService.setAmount(this.amountKey, 0);
      this.updateState();
    }
  }

  updateState() {
    const state = this.stateService.getState();

    if (this.amountKey === 'amount_1') {
      const convertedAmount = this.convertService.convertAmount2(
        this.currencyAmount,
        state.currency_1,
      );
      this.stateService.setAmount('amount_2', convertedAmount);
    } else {
      const convertedAmount = this.convertService.convertAmount1(
        this.currencyAmount,
        state.currency_2,
      );
      this.stateService.setAmount('amount_1', convertedAmount);
    }
    console.log(state);
  }
}
