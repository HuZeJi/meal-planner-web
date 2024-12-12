import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-daily-detail',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './daily-detail.component.html',
  styleUrl: './daily-detail.component.scss'
})
export class DailyDetailComponent implements OnInit{
  @Input() dailyPlan: any;
  @Output() onCloseDailyDetail = new EventEmitter<any>();
  constructor() { /** empty constructor */ }

  public ngOnInit(): void {
    console.log( this.dailyPlan );
  }

  public onClose(): void {
    this.onCloseDailyDetail.emit( { hasChanges: false, dailyPlan: this.dailyPlan } );
  }
}
