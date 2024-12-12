import { Component, Input } from '@angular/core';
import { DailyPlan } from '../../../model/daily-plan.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-header-summary',
  standalone: true,
  imports: [ DatePipe],
  templateUrl: './header-summary.component.html',
  styleUrl: './header-summary.component.scss'
})
export class HeaderSummaryComponent {
  @Input() dailyPlan!: DailyPlan;
}
