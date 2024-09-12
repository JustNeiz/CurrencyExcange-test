import { Component, Input, OnInit } from '@angular/core';
import { currencyFlags } from '../../../constants/currencyFlags';

@Component({
  selector: 'app-select-option',
  standalone: true,
  imports: [],
  templateUrl: './select-option.component.html',
  styleUrl: './select-option.component.scss',
})
export class SelectOptionComponent {
  @Input() flag!: { key: string; value: string };

  protected readonly currencyFlags = currencyFlags;
}
