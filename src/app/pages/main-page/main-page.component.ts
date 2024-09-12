import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/organisms/header/header.component';
import { DashboardComponent } from '../../components/organisms/dashboard/dashboard.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [HeaderComponent, DashboardComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
})
export class MainPageComponent {}
