import { Component } from '@angular/core';
import { CompanyLogoComponent } from '../../atoms/company-logo/company-logo.component';
import { CompanyNameComponent } from '../../atoms/company-name/company-name.component';

@Component({
  selector: 'app-company-container',
  standalone: true,
  imports: [CompanyLogoComponent, CompanyNameComponent],
  templateUrl: './company-container.component.html',
  styleUrl: './company-container.component.scss',
})
export class CompanyContainerComponent {}
