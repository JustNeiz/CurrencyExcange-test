import { Injectable } from '@angular/core';
import { ICurrencyAmountsStateTypes } from './currency-amounts-state.types';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrencyAmountsState {
  // Создаем BehaviorSubject с начальными значениями
  private stateSubject = new BehaviorSubject<ICurrencyAmountsStateTypes>({
    amount_1: 0,
    amount_2: 0,
    currency_1: 'USD',
    currency_2: 'EUR',
  });

  // Делаем state$ доступным для подписок
  state$ = this.stateSubject.asObservable();

  // Метод для обновления суммы
  setAmount(key: 'amount_1' | 'amount_2', value: number): void {
    const currentState = this.stateSubject.value;
    const newState = { ...currentState, [key]: value };
    this.stateSubject.next(newState);
  }

  // Метод для обновления валюты
  setCurrency(key: 'currency_1' | 'currency_2', value: string): void {
    const currentState = this.stateSubject.value;
    const newState = { ...currentState, [key]: value }; // Обновляем поле, а не добавляем новое
    this.stateSubject.next(newState);
  }

  // Метод для получения текущего состояния
  getState(): ICurrencyAmountsStateTypes {
    return this.stateSubject.value;
  }
}
