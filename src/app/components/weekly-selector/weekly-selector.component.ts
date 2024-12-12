import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WeeklyPlan } from '../../model/weekly-plan.model';
import { DateUtilService } from '../../services/utils/date-util.service';
import { PlanService } from '../../services/plan.service';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-weekly-selector',
  standalone: true,
  imports: [ DatePipe, FormsModule ],
  templateUrl: './weekly-selector.component.html',
  styleUrl: './weekly-selector.component.scss'
})
export class WeeklySelectorComponent implements OnInit{
  // TODO: recieve a date as input
  @Input() public weeklyPlan!: WeeklyPlan;
  @Output() public onDateChange = new EventEmitter<Date>();
  
  public selectedDate!: Date;
  public selectedDateFormatted!: string;
  public weekStartDate!: Date;
  public weekEndDate!: Date;

  constructor(
    private dateUtilSvc: DateUtilService
    , private planSvc: PlanService
  ) { /** empty constructor */ }

  ngOnInit(): void {
    this.selectedDate = this.dateUtilSvc.removeTime( new Date() );
    this.selectedDateFormatted = this.dateUtilSvc.formatDate( this.selectedDate ) || '';
    console.log( this.selectedDateFormatted)

    this.weekStartDate = this.getStartOfWeek( this.selectedDate );
    this.weekEndDate = this.getEndOfWeek( this.selectedDate );

    this.onDateChange.emit( this.selectedDate );
  }

  // a function thats gets the start of the week based on the selected date
  public getStartOfWeek( date: Date ): Date {
    const day = date.getDay();
    const diff = date.getDate() - day + ( day == 0 ? -6 : 1 );
    return new Date( date.setDate( diff ) );
  }

  // a function thats gets the end of the week based on the selected date
  public getEndOfWeek( date: Date ): Date {
    const day = date.getDay();
    const diff = date.getDate() - day + ( day == 0 ? 0 : 7 );
    return new Date( date.setDate( diff ) );
  }

    /**
   * Moves the selected week by a given direction.
   * 
   * @param direction - The direction to move the week. Positive values move forward, negative values move backward.
   * 
   * Updates the selected date, week start date, week end date, and daily plans based on the new selected date.
   */
    public onMoveWeek( direction: number ): void {
      this.selectedDate.setDate( this.selectedDate.getDate() + ( direction * 7 ) );
      this.selectedDateFormatted = this.dateUtilSvc.formatDate( this.selectedDate ) || '';
      this.weekStartDate = this.getStartOfWeek( this.selectedDate );
      this.weekEndDate = this.getEndOfWeek( this.selectedDate );

      this.onDateChange.emit( this.selectedDate );
    }
  
    /**
     * Moves the selected date to today.
     * 
     * Updates the selected date, week start date, week end date, and daily plans based on the new selected date.
     */
    public onMoveToToday(): void {
      this.selectedDateFormatted = this.dateUtilSvc.formatDate( new Date() ) || '';
      this.selectedDate = this.dateUtilSvc.removeTime( new Date() );
      this.weekStartDate = this.getStartOfWeek( this.selectedDate );
      this.weekEndDate = this.getEndOfWeek( this.selectedDate );

      this.onDateChange.emit( this.selectedDate );
    }

    public onChangeDateSearch( dateStr: string ): void {
      this.selectedDateFormatted = dateStr;
      this.selectedDate = new Date( dateStr );
      this.weekStartDate = this.getStartOfWeek( this.selectedDate );
      this.weekEndDate = this.getEndOfWeek( this.selectedDate );

      this.onDateChange.emit( this.selectedDate );
    }
}
