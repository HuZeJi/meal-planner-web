import { Component } from '@angular/core';
import { DashboardComponent } from "../dashboard/dashboard.component";
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { WeeklyPlanComponent } from '../weekly-plan/weekly-plan.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [ DashboardComponent, NavMenuComponent, WeeklyPlanComponent ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  public menuIndex: number = 1;

  public HOME = 0;
  public WEEKLY_PLAN = 1;

  public onGoTo( menuIndex: number ): void { this.menuIndex = menuIndex; }
}
