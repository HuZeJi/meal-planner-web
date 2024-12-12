import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DateUtilService } from '../../services/utils/date-util.service';
import { FormsModule } from '@angular/forms';
import { PlanService } from '../../services/plan.service';
import { WeeklySelectorComponent } from '../weekly-selector/weekly-selector.component';
import { WeeklyPlan } from '../../model/weekly-plan.model';
import { DailyPlan } from '../../model/daily-plan.model';
import { Meal } from '../../model/meal.model';

@Component({
  selector: 'app-weekly-plan',
  standalone: true,
  imports: [ DatePipe, FormsModule, WeeklySelectorComponent, CommonModule ],
  providers: [ DateUtilService, DatePipe ],
  templateUrl: './weekly-plan.component.html',
  styleUrl: './weekly-plan.component.scss'
})
export class WeeklyPlanComponent implements OnInit {
  // public weekStartDate!: Date;
  // public weekEndDate!: Date;
  // public selectedDate = this.dateUtilSvc.removeTime( new Date() );

  // public dailyPlans!: any[];

  // constructor(
  //   private dateUtilSvc: DateUtilService
  //   , private planSvc: PlanService
  // ) { /** empty constructor */ }

  // ngOnInit(): void {
  //   this.weekStartDate = this.getStartOfWeek( this.selectedDate );
  //   this.weekEndDate = this.getEndOfWeek( this.selectedDate );
  //   this.dailyPlans = this.getDailyPlans();
  // }

  // // a function thats gets the start of the week based on the selected date
  // public getStartOfWeek( date: Date ): Date {
  //   const day = date.getDay();
  //   const diff = date.getDate() - day + ( day == 0 ? -6 : 1 );
  //   return new Date( date.setDate( diff ) );
  // }

  // // a function thats gets the end of the week based on the selected date
  // public getEndOfWeek( date: Date ): Date {
  //   const day = date.getDay();
  //   const diff = date.getDate() - day + ( day == 0 ? 0 : 7 );
  //   return new Date( date.setDate( diff ) );
  // }

  
  // public getDailyPlans(): any[] {
  //   const dailyPlans = [];
  //   const currentDate = new Date( this.weekStartDate );
  //   while ( currentDate <= this.weekEndDate ) {
  //     const dailyPlanDate = new Date( currentDate );
  //     const meals = [
  //       { name: 'Breakfast', description: '' },
  //       { name: 'Lunch', description: '' },
  //       { name: 'Dinner', description: '' },
  //     ];
  //     dailyPlans.push( { date: dailyPlanDate, meals, dayOfTheWeek: this.dateUtilSvc.getDayOfWeek( dailyPlanDate ) } );
  //     currentDate.setDate( currentDate.getDate() + 1 );
  //   }
  //   console.log( dailyPlans );
  //   return dailyPlans;
  // }

  
  // /**
  //  * Moves the selected week by a given direction.
  //  * 
  //  * @param direction - The direction to move the week. Positive values move forward, negative values move backward.
  //  * 
  //  * Updates the selected date, week start date, week end date, and daily plans based on the new selected date.
  //  */
  // public onMoveWeek( direction: number ): void {
  //   this.selectedDate.setDate( this.selectedDate.getDate() + ( direction * 7 ) );
  //   this.weekStartDate = this.getStartOfWeek( this.selectedDate );
  //   this.weekEndDate = this.getEndOfWeek( this.selectedDate );
  //   this.dailyPlans = this.getDailyPlans();
  // }

  // /**
  //  * Moves the selected date to today.
  //  * 
  //  * Updates the selected date, week start date, week end date, and daily plans based on the new selected date.
  //  */
  // public onMoveToToday(): void {
  //   this.selectedDate = this.dateUtilSvc.removeTime( new Date() );
  //   this.weekStartDate = this.getStartOfWeek( this.selectedDate );
  //   this.weekEndDate = this.getEndOfWeek( this.selectedDate );
  //   this.dailyPlans = this.getDailyPlans();
  // }

  // public onSaveWeeklyPlan(): void {
  //   // TODO: clean the object before saving
  //   const weeklyPlan = {
  //     startDate: this.weekStartDate,
  //     endDate: this.weekEndDate,
  //     dailyPlans: this.dailyPlans,
  //   };
  //   this.planSvc.saveWeeklyPlan( weeklyPlan )
  //     .subscribe( data => console.log( data ) );
  // }

  public weeklyPlan!: WeeklyPlan;
  public weekSearch!: Date;
  public selectedDailyPlan!: DailyPlan;
  public selectedMeal!: Meal;
  public updatedMeal!: Meal;

  constructor(
    private readonly planSvc: PlanService,
    private readonly dateUtilSvc: DateUtilService
  ) { /** empty constructor */ }  

  ngOnInit() {
  }

  public onSaveMeal(): void {}
  public onCancelMeal(): void {}

  public searchWeek(): void {
    const formatedWeekSearch = this.dateUtilSvc.formatDate( this.weekSearch );
    if( formatedWeekSearch === null ) throw new Error( 'Invalid date' );
    this.planSvc.getWeeklyPlan('582632db-a7e0-45f2-9d75-fa590a98c6a1', formatedWeekSearch )
      .subscribe( data => this.initData( data ) );
  }

  private initData( data: any ): void {
    this.weeklyPlan = data;
    if( !this.weeklyPlan ) return;

    this.weeklyPlan.dailyPlans = this.weeklyPlan
      .dailyPlans
      // TODO: add class for daily plan
      .map( ( dailyPlan: any ) => {
        // setting the day of the week
        dailyPlan.date = new Date( dailyPlan.date );
        // TODO: add region to date
        dailyPlan.dayOfWeek = dailyPlan.date.toLocaleDateString( 'en-US', { weekday: 'long' });
        return dailyPlan;
      } );

      // TODO: improve the selection of the default daily plan and meal
      this.onSelectDay( this.weeklyPlan.dailyPlans[0] );
  }

  public onChangeWeekSearch( weekSearch: Date ): void {
    // TODO: don't change on child component if there are changes
    this.weekSearch = weekSearch;
    this.searchWeek();
  }

  public onSelectDay( dailyPlan : DailyPlan ){
    // TODO: add confirmation to proceed with pending changes
    if( this.isMealUpdated() ) { alert( 'You have unsaved changes' ); return; }
    this.selectedDailyPlan = dailyPlan;
    this.selectedMeal = dailyPlan.meals[0];
    this.updatedMeal = { ...this.selectedMeal };
  }

  public onSelectMeal( meal: Meal ): void {
    // TODO: add confirmation to proceed with pending changes
    if( this.isMealUpdated() ) { alert( 'You have unsaved changes' ); return; }
    this.selectedMeal = meal;
  }

  // functions that check if updateMeal and selected meal are the same
  public isMealUpdated(): boolean {
    return JSON.stringify( this.selectedMeal ) !== JSON.stringify( this.updatedMeal );
  }

  // TODO: a function that alerts the user that the changes are not saved when change tab

}
