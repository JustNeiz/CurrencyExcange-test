import { Component, HostListener, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ICurrencyFlag } from '../../../types/ICurrencyFlag';
import { currencyFlags } from '../../../constants/currencyFlags';
import { SelectOptionComponent } from '../../atoms/select-option/select-option.component';

@Component({
  selector: 'app-custom-autocomplete',
  standalone: true,
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    CommonModule,
    SelectOptionComponent,
  ],
  templateUrl: './custom-autocomplete.component.html',
  styleUrl: './custom-autocomplete.component.scss',
})
export class CustomAutocompleteComponent implements OnInit {
  myControl = new FormControl('');
  showOptions = false;
  filteredFlags!: Observable<ICurrencyFlag[]>;
  currencyFlags: ICurrencyFlag[] = currencyFlags;
  @Input() currencyKey!: 'currency_1' | 'currency_2';

  ngOnInit() {
    this.filteredFlags = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || '')),
    );
  }

  private _filter(value: string): ICurrencyFlag[] {
    const filterValue = value.toLowerCase();

    return this.currencyFlags.filter(
      (option) =>
        option.value.toLowerCase().includes(filterValue) ||
        option.key.toLowerCase().includes(filterValue),
    );
  }

  showOptionsList() {
    this.showOptions = true;
  }

  hideOptionsList() {
    setTimeout(() => (this.showOptions = false), 200); // Delay to allow option click
  }

  selectOption(option: string) {
    this.myControl.setValue(option);
    this.hideOptionsList();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const clickedElement = event.target as HTMLElement;
    if (!clickedElement.closest('.autocomplete')) {
      this.hideOptionsList();
    }
  }
}
