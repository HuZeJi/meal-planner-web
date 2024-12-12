import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DailyPlan } from '../../../model/daily-plan.model';
import { Meal } from '../../../model/meal.model';

@Component({
  selector: 'app-meal-nav',
  standalone: true,
  imports: [],
  templateUrl: './meal-nav.component.html',
  styleUrl: './meal-nav.component.scss'
})
export class MealNavComponent {
  @Input() dailyPlan!: DailyPlan;
  @Output() selectMeal = new EventEmitter<Meal>();

  public onSelectMeal( meal: Meal ): void {
    this.selectMeal.emit( meal );
  }

}
