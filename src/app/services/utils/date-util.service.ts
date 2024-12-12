import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateUtilService {
  constructor( private datePipe: DatePipe ) {}

  formatDate(date: Date | string, format: string = 'yyyy-MM-dd' ): string | null {
    return this.datePipe.transform( date, format );
  }

  // a function that return the day of the week
  getDayOfWeek( date: Date ): string | null {
    return this.datePipe.transform( date, 'EEEE' );
  }

    // function that delete the time from the date
    public removeTime( date: Date ): Date {
      return new Date( date.getFullYear(), date.getMonth(), date.getDate() );
    }

    // function that return a string with the year, month and day based on the date
    public getDateString( date: Date ): string {
      return date.toISOString().split('T')[0];
    }
}
