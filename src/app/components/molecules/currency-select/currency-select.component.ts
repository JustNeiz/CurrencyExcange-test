import { Component, inject, OnInit } from '@angular/core';
import {
  AsyncPipe,
  CommonModule,
  KeyValuePipe,
  NgForOf,
} from '@angular/common'; // Ensure CommonModule is imported
import { currencyFlags } from '../../../constants/currencyFlags';
import { SelectOptionComponent } from '../../atoms/select-option/select-option.component';
import {
  MatAutocomplete,
  MatAutocompleteModule,
  MatAutocompleteTrigger,
  MatOption,
} from '@angular/material/autocomplete';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { ICurrencyFlag } from '../../../types/ICurrencyFlag';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-currency-select',
  standalone: true,
  imports: [
    NgForOf,
    SelectOptionComponent,
    KeyValuePipe,
    MatAutocomplete,
    MatOption,
    MatAutocompleteTrigger,
    MatFormField,
    AsyncPipe,
    MatFormFieldModule, // Import MatFormFieldModule for form field styling
    MatInputModule, // Import MatInputModule to use matInput directive
    MatAutocompleteModule,
    ReactiveFormsModule,
  ],
  templateUrl: './currency-select.component.html',
  styleUrl: './currency-select.component.scss',
})
export class CurrencySelectComponent implements OnInit {
  myControl = new FormControl('');
  filteredFlags!: Observable<ICurrencyFlag[]>;
  currencyFlags: ICurrencyFlag[] = currencyFlags;

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
}
