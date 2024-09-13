import { Injectable } from '@angular/core';
import { ICurrencyAmountsState } from './currency-amounts-state.types';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrencyAmountsState {
  private stateSubject = new BehaviorSubject<ICurrencyAmountsState>({
    amount_1: 0,
    amount_2: 0,
    currency_1: 'USD',
    currency_2: 'USD',
  });

  state$ = this.stateSubject.asObservable();

  setAmount(key: 'amount_1' | 'amount_2', value: number): void {
    const currentState = this.stateSubject.value;
    const newState = { ...currentState, [key]: value };
    this.stateSubject.next(newState);
  }

  setCurrency(key: 'currency_1' | 'currency_2', value: string): void {
    const currentState = this.stateSubject.value;
    const newState = { ...currentState, [key]: value };
    this.stateSubject.next(newState);
  }

  getState(): ICurrencyAmountsState {
    return this.stateSubject.value;
  }
}
