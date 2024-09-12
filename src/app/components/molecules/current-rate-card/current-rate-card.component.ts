import { Component, Input, SimpleChanges } from '@angular/core';
import { ICurrencyFlag } from '../../../types/ICurrencyFlag';
import { currencyFlags } from '../../../constants/currencyFlags';
import { IRatePair } from '../../../types/RatePair';

@Component({
  selector: 'app-current-rate-card',
  standalone: true,
  imports: [],
  templateUrl: './current-rate-card.component.html',
  styleUrl: './current-rate-card.component.scss',
})
export class CurrentRateCardComponent {
  @Input() rate!: IRatePair;
  imagePath: string = '';
  ngOnInit(): void {
    this.imagePath = this.getImagePath(this.rate);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['rate']) {
      this.imagePath = this.getImagePath(this.rate);
    }
  }

  getImagePath(rate: IRatePair): string {
    const pathObj = currencyFlags.find((flag) => flag.key === rate.key);
    return pathObj ? pathObj.value : '';
  }
}
