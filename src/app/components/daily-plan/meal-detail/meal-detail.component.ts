import { Component, Input } from '@angular/core';
import { Meal } from '../../../model/meal.model';

@Component({
  selector: 'app-meal-detail',
  standalone: true,
  imports: [],
  templateUrl: './meal-detail.component.html',
  styleUrl: './meal-detail.component.scss'
})
export class MealDetailComponent {
  @Input() meal!: Meal;

}
