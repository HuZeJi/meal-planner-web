import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  private apiUrl = 'http://localhost:8080/private/api/v1/planner'; // Replace with your API URL

  constructor( private http: HttpClient ) {}

  // TODO: add class for weekly plan
  public getWeeklyPlan(
    userId: string,
    date: string
  ): Observable<any> {
    // TODO: set host to environment variable
    const url = `http://localhost:8080/private/api/v1/planner/user/${userId}/date/${date}`;
    return this.http.get<any>( url )
    .pipe(
      catchError( ( e: any ) => this.handleError( e ))
    );
  }

  // TODO: add class for weekly plan
  public getDailyPlan(
    userId: string,
    date: string
  ): Observable<any> {
    // TODO: set host to environment variable
    const url = `http://localhost:8080/private/api/v1/planner/daily-plan/user/${userId}/date/${date}`;
    return this.http.get<any>( url )
    .pipe(
      catchError( ( e: any ) => this.handleError( e ))
    );
  }


  /**
   * Saves the weekly plan by making a POST request to the API.
   *
   * @param weeklyPlan - The weekly plan data to be saved.
   * @returns An Observable that emits the response from the API.
   */
  public saveWeeklyPlan( weeklyPlan: any ): Observable<any> {
    return this.http.post<any>( this.apiUrl, weeklyPlan )
      .pipe(
        catchError( ( e: any ) => this.handleError( e ))
      );
  }

  /**
   * Retrieves the shopping list for a given weekly plan.
   *
   * @param weeklyPlanId - The ID of the weekly plan for which to retrieve the shopping list.
   * @returns An Observable that emits the shopping list data.
   */
  public getWeeklyPlanShoppingList( weeklyPlanId: string ): Observable<any> {
    const url = `${this.apiUrl}/shopping-list/weekly-plan/${ weeklyPlanId }`;
    return this.http.get<any>( url )
      .pipe(
        catchError( ( e: any ) => this.handleError( e ))
      );
  }

  // Handle errors
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      console.error('An error occurred:', error.error.message);
    } else {
      // Backend error
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something went wrong; please try again later.');
  }
}
