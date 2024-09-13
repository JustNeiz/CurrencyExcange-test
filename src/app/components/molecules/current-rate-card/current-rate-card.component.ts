import { Component, Input, OnInit } from '@angular/core';
import { currencyFlags } from '../../../constants/currencyFlags';
import { IRatePair } from '../../../types/RatePair';

@Component({
  selector: 'app-current-rate-card',
  standalone: true,
  imports: [],
  templateUrl: './current-rate-card.component.html',
  styleUrl: './current-rate-card.component.scss',
})
export class CurrentRateCardComponent implements OnInit {
  @Input() rate!: IRatePair;

  imagePath: string = '';
  ngOnInit(): void {
    this.imagePath = this.getImagePath(this.rate);
  }

  getImagePath(rate: IRatePair): string {
    const pathObj = currencyFlags.find((flag) => flag.key === rate.key);
    return pathObj ? pathObj.value : '';
  }
}
