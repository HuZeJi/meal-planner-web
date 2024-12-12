import { Component, OnInit } from '@angular/core';
import { PlanService } from '../../services/plan.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DateUtilService } from '../../services/utils/date-util.service';
import { ShoppingListComponent } from "../shopping-list/shopping-list.component";
import { HeaderSummaryComponent } from '../weekly-plan/header-summary/header-summary.component';
import { DailyPlan } from '../../model/daily-plan.model';
import { DailyDetailComponent } from '../daily-detail/daily-detail.component';
import { MealNavComponent } from '../daily-plan/meal-nav/meal-nav.component';
import { MealDetailComponent } from '../daily-plan/meal-detail/meal-detail.component';
import { Meal } from '../../model/meal.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule
    , FormsModule 
    , DailyDetailComponent
    , ShoppingListComponent
    , HeaderSummaryComponent
    , MealNavComponent
    , MealDetailComponent
  ],
  providers: [ DateUtilService, DatePipe ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  public dailyPlan!: DailyPlan;
  public dateSearch!: Date;
  public selectedMeal!: Meal;

  constructor(
    private readonly planSvc: PlanService
    , private readonly dateUtilSvc: DateUtilService
  ) { /** empty constructor */ }

  public ngOnInit(): void {
    this.dateSearch = this.dateUtilSvc.removeTime( new Date() );
    // TODO: set the current date
    // TODO: generate a date util
    this.planSvc.getDailyPlan(
        '582632db-a7e0-45f2-9d75-fa590a98c6a1', 
        this.dateUtilSvc.getDateString( this.dateSearch ) 
      )
      .subscribe( data => this.initData( data ) );
  }

  private initData( data: DailyPlan ): void {
    if( !data ) return;
    this.dailyPlan = data;
    this.dailyPlan.date = new Date( this.dailyPlan.date );
    this.dailyPlan.dayOfWeek = this.dailyPlan.date.toLocaleDateString( 'en-US', { weekday: 'long' });
    console.log( { dailyPlan: this.dailyPlan } );

    if( this.dailyPlan.meals.length > 0 ) {
      this.selectedMeal = this.dailyPlan.meals[0];
    }
  }

  public onSelectMeal( meal: Meal ): void {
    this.selectedMeal = meal;
  }

  // public weeklyPlan: any;
  // public weekSearch: any;
  // public selectedDailyPlan: any;
  // public shoppingList!: any;
  // constructor(
  //   private readonly planSvc: PlanService
  //   , private readonly dateUtilSvc: DateUtilService
  // ) { /** empty constructor */ }

  // public ngOnInit(): void {
  //   this.weekSearch = this.dateUtilSvc.removeTime( new Date() );
  //   // TODO: set the current date
  //   // TODO: generate a date util
  //   this.planSvc.getWeeklyPlan('582632db-a7e0-45f2-9d75-fa590a98c6a1', this.dateUtilSvc.getDateString( this.weekSearch ) )
  //     .subscribe( data => this.initData( data ) );
  // }

  // private initData( data: any ): void {
  //   this.weeklyPlan = data;
  //   if( !this.weeklyPlan ) return;

  //   this.weeklyPlan.dailyPlans = this.weeklyPlan
  //     .dailyPlans
  //     // TODO: add class for daily plan
  //     .map( ( dailyPlan: any ) => {
  //       // setting the day of the week
  //       dailyPlan.date = new Date( dailyPlan.date );
  //       // TODO: add region to date
  //       dailyPlan.dayOfWeek = dailyPlan.date.toLocaleDateString( 'en-US', { weekday: 'long' });
  //       return dailyPlan;
  //     } );

  //     console.log( this.weeklyPlan );
  // }

  // public searchWeek(): void {
  //   const formatedWeekSearch = this.dateUtilSvc.formatDate( this.weekSearch );
  //   if( formatedWeekSearch === null ) throw new Error( 'Invalid date' );
  //   this.planSvc.getWeeklyPlan('582632db-a7e0-45f2-9d75-fa590a98c6a1', formatedWeekSearch )
  //     .subscribe( data => this.initData( data ) );
  // }

  // public onSelectDailyDetail( dailyPlan: any ): void {
  //   this.selectedDailyPlan = dailyPlan;
  // }

  // public onCloseDailyDetail( event: any ): void {
  //   console.log( { event } );
  //   this.selectedDailyPlan = null;
  // }

  // public onGenerateShoppingList(): void {
  //   this.planSvc.getWeeklyPlanShoppingList( this.weeklyPlan.id )
  //     .subscribe( shoppingList => {
  //       this.shoppingList = shoppingList;
  //       console.log( shoppingList );
  //     } );
  // }

  // public onCloseShoppingListModal(): void {
  //   this.shoppingList = null;
  // }
}
