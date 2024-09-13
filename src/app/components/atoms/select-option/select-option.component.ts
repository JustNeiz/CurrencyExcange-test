import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-select-option',
  standalone: true,
  imports: [],
  templateUrl: './select-option.component.html',
  styleUrl: './select-option.component.scss',
})
export class SelectOptionComponent {
  @Input() flag!: { key: string; value: string };
  @Input() currencyKey!: 'currency_1' | 'currency_2';
  @Output() flagSelected = new EventEmitter<{ key: string; value: string }>();

  onOptionClick() {
    this.flagSelected.emit(this.flag);
  }
}
