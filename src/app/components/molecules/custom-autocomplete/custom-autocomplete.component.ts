import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ICurrencyFlag } from '../../../types/ICurrencyFlag';
import { currencyFlags } from '../../../constants/currencyFlags';
import { SelectOptionComponent } from '../../atoms/select-option/select-option.component';
import { CurrencyAmountsState } from '../../../services/CurrencyAmountsStateService/currency-amounts-state.service';
import { ConvertService } from '../../../services/ConvertService/convert.service';
import { ICurrencyAmountsState } from '../../../services/CurrencyAmountsStateService/currency-amounts-state.types';

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
  selectedFlag!: { key: string; value: string };
  state!: ICurrencyAmountsState;

  @Input() currencyKey!: 'currency_1' | 'currency_2';
  @Output() currencyChange = new EventEmitter<string>();

  ngOnInit() {
    this.stateService.state$.subscribe((newState) => {
      this.state = newState;
    });

    this.filteredFlags = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || '')),
    );
  }

  onFlagSelected(flag: { key: string; value: string }) {
    this.selectedFlag = flag;
    this.stateService.setCurrency(this.currencyKey, this.selectedFlag.key);
    this.convertState();
  }

  convertState() {
    if (this.currencyKey === 'currency_2') {
      this.convertService.convertAmount2(
        this.state.amount_1,
        this.state.currency_1,
      );
    }
    if (this.currencyKey === 'currency_1') {
      this.convertService.convertAmount1(
        this.stateService.getState().amount_2,
        this.state.currency_2,
      );
    }
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
    this.stateService.setCurrency(this.currencyKey, option);
    this.hideOptionsList();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const clickedElement = event.target as HTMLElement;
    if (!clickedElement.closest('.autocomplete')) {
      this.hideOptionsList();
    }
  }
  constructor(
    private stateService: CurrencyAmountsState,
    private convertService: ConvertService,
  ) {
    this.state = stateService.getState();
  }
}
