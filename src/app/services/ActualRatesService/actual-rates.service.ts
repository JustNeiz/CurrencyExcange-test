import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICurrencyRatePair } from './currency-rate-pair.types';

@Injectable({
  providedIn: 'root',
})
export class ActualRatesService {
  private ratesStateSubject: BehaviorSubject<ICurrencyRatePair[]> =
    new BehaviorSubject<ICurrencyRatePair[]>([]);

  setRatesState(newArray: ICurrencyRatePair[]): void {
    this.ratesStateSubject.next(newArray);
  }

  getRatesState(): Observable<ICurrencyRatePair[]> {
    return this.ratesStateSubject.asObservable();
  }
}
