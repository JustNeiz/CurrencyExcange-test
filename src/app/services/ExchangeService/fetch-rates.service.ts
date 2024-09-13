import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../../constants/urls';
import { Observable } from 'rxjs';
import { IFetchRatesRespone } from './fetch-rates.types';

@Injectable({
  providedIn: 'root',
})
export class FetchRatesService {
  getCurrencyRate(currency: string): Observable<IFetchRatesRespone> {
    return this.http.get<IFetchRatesRespone>(`${baseURL}/latest/${currency}`);
  }
  constructor(private http: HttpClient) {}
}
