import { Component, Input, OnInit } from '@angular/core';
import { ICurrencyFlag } from '../../../types/ICurrencyFlag';
import { CurrentRateCardComponent } from '../current-rate-card/current-rate-card.component';
import { IRatePair } from '../../../types/RatePair';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-current-rate',
  standalone: true,
  imports: [CurrentRateCardComponent, CommonModule],
  templateUrl: './current-rate.component.html',
  styleUrl: './current-rate.component.scss',
})
export class CurrentRateComponent {
  @Input() ratesArr: IRatePair[] = [];
}
