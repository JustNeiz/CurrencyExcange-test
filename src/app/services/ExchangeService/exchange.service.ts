import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../../constants/urls';
import { Observable } from 'rxjs';
import { IExchangeRateResponse } from './ExchangeServices.types';

@Injectable({
  providedIn: 'root',
})
export class ExchangeService {
  getCurrencyRate(currency: string): Observable<IExchangeRateResponse> {
    return this.http.get<IExchangeRateResponse>(
      `${baseURL}/latest/${currency}`,
      {},
    );
  }
  constructor(private http: HttpClient) {}
}
